import config, { presaleStartTime } from "../config";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {
  setSaleStatus,
  setTokenPrice,
  setTotalTokensSold,
} from "../store/presale";
import { useMemo, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { setBalance } from "../store/wallet";
import { toast } from "react-toastify";

import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  getContract,
  http,
  parseUnits,
  zeroAddress,
} from "viem";
import { presaleAbi } from "../contracts/presaleABI";
import { presaleAbi_testnet } from "../contracts/presaleABI_testnet";
import dayjs from "dayjs";
import useCurrentChain from "./useCurrentChain";
import { bscTestnet } from "wagmi/chains";

const publicClients = config.chains.reduce((acc, chain) => {
  acc[chain.id] = createPublicClient({
    chain,
    batch: { multicall: true },
    transport: http(),
  });
  return acc;
}, {} as { [key: number]: ReturnType<typeof createPublicClient> });

const useWeb3Functions = () => {
  const chain = useCurrentChain();
  const [loading, setLoading] = useState(false);
  const tokens = useSelector((state: RootState) => state.presale.tokens);
  const dispatch = useDispatch();
  const { data: signer } = useWalletClient();
  const { address } = useAccount();

  const publicClient = useMemo(() => publicClients[chain.id], [chain.id]);

  const presaleContract = useMemo(() => {
    return getContract({
      address: config.presaleContract[chain.id],
      abi: chain.id === bscTestnet.id ? presaleAbi_testnet : presaleAbi,
      client: {
        public: publicClient,
        wallet: signer || undefined,
      },
    });
  }, [chain, publicClient, signer]);

  const fetchIntialData = async () => {
    setLoading(true);

    const [saleStatus] = await Promise.all([
      presaleContract.read.saleStatus(),
      fetchTotalTokensSold(),
      fetchTokenPrices(),
    ]);

    dispatch(setSaleStatus(saleStatus));

    setLoading(false);
  };

  const fetchTotalTokensSold = async () => {
    let extraAmount = 0;
    let incrase = 0;

    const totalTokensSold = await Promise.all(
      config.chains.map((chain) =>
        publicClients[chain.id].readContract({
          address: config.presaleContract[chain.id],
          abi: chain.id === bscTestnet.id ? presaleAbi_testnet : presaleAbi,
          functionName: "totalTokensSold",
        })
      )
    );

    try {
      const resposne = await fetch("/settings.json");
      const settings = await resposne.json();
      extraAmount = settings?.x;
      incrase = settings?.y;
      // eslint-disable-next-line no-empty
    } catch (e) {}

    const amount = +format(totalTokensSold.reduce((a, b) => a + b, 0n)) || 0;
    const m = dayjs().diff(dayjs.unix(presaleStartTime), "minute");

    const ext = amount + incrase * Math.floor(m / 10);
    let total = (amount < ext ? ext : amount) + extraAmount;
    total = total > config.stage.total ? config.stage.total : total;
    dispatch(setTotalTokensSold(total));
  };

  const fetchLockedBalance = async () => {
    if (!address) return;

    const { symbol, decimals } = config.saleToken[chain.id];
    const buyerAmount = await presaleContract.read.buyersDetails([address]);
    const balance = +formatUnits(buyerAmount[0], decimals);

    dispatch(setBalance({ symbol: symbol, balance }));
  };

  const fetchTokenBalances = async () => {
    if (!address) return;

    const balancses = await Promise.all(
      tokens[chain.id].map((token) => {
        if (token.address) {
          return publicClient.readContract({
            address: token.address,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
          });
        } else {
          return publicClient.getBalance({ address });
        }
      })
    );

    tokens[chain.id].forEach((token, index) => {
      dispatch(
        setBalance({
          symbol: token.symbol,
          balance: +formatUnits(balancses[index], token.decimals),
        })
      );
    });
  };

  const fetchTokenPrices = async () => {
    const pricses = await Promise.all(
      tokens[chain.id].map((token) => {
        if (token.address) {
          return presaleContract.read.tokenPrices([token.address]);
        } else {
          return presaleContract.read.rate();
        }
      })
    );

    tokens[chain.id].forEach((token, index) => {
      dispatch(
        setTokenPrice({
          symbol: token.symbol,
          price: +formatUnits(pricses[index], token.decimals),
        })
      );
    });
  };

  const checkAllowance = async (
    token: Token,
    owner: Address,
    spender: Address,
    amount: bigint
  ) => {
    if (!token.address || !signer || !address) return;

    const tokenContract = getContract({
      address: token.address,
      abi: erc20Abi,
      client: {
        public: publicClient,
        wallet: signer,
      },
    });
    const allowance = await tokenContract.read.allowance([owner, spender]);

    if (allowance < amount) {
      const hash = await tokenContract.write.approve([
        spender,
        parseUnits("9999999999999999999999999999", 18),
      ]);
      await publicClient.waitForTransactionReceipt({ hash });
      toast.success("Spend approved");
    }
  };

  const buyToken = async (value: string | number, token: Token) => {
    let success = false;
    let hash;

    if (!signer || !address) return { success, txHash: hash };

    setLoading(true);

    try {
      const amount = parseUnits(`${value}`, token.decimals);

      if (token.address) {
        await checkAllowance(
          token,
          address,
          config.presaleContract[chain.id],
          amount
        );
      }

      // Use conditional function name
      const functionName =
        chain.id === bscTestnet.id ? "purchaseTokens" : "buyToken";

      const { request } = await presaleContract.simulate[functionName](
        [token.address || zeroAddress, amount],
        { account: address, value: token.address ? 0n : amount }
      );

      hash = await signer.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      // const purchased_amount = token.address
      //   ? await presaleContract.read.getTokenAmount([token.address, amount])
      //   : await presaleContract.read.getTokenAmount([zeroAddress, amount]);

      // storeTransaction({
      //   wallet_address: address,
      //   purchased_amount: +format(purchased_amount),
      //   paid_amount: value,
      //   transaction_hash: hash,
      //   paid_with: token.symbol,
      //   chain: chain.id,
      // });

      // storeReferralTransaction({
      //   purchased_amount: +format(purchased_amount),
      //   paid: value,
      //   transaction_hash: hash,
      //   payable_token: token.symbol,
      //   chain: currentChain.id,
      // });

      fetchTokenBalances();
      fetchLockedBalance();
      fetchTotalTokensSold();

      toast.success(
        `You have successfully purchased $${
          config.saleToken[chain.id].symbol
        } Tokens. Thank you!`
      );

      success = true;
    } catch (error: any) {
      toast.error(
        error?.walk?.().shortMessage ||
          error?.walk?.().message ||
          error?.message ||
          "Signing failed, please try again!"
      );
    }

    setLoading(false);

    return { success, txHash: hash };
  };

  const addTokenAsset = async (token: Token) => {
    if (!token.address || !signer) return;
    try {
      await signer.watchAsset({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals ?? 18,
            image: token.image.includes("http")
              ? token.image
              : `${window.location.origin}${token.image}`,
          },
        },
      } as any);
      toast.success("Token imported to metamask successfully");
    } catch (e) {
      toast.error("Token import failed");
    }
  };

  const parse = (value: string | number) =>
    parseUnits(`${value}`, config.saleToken[chain.id].decimals);

  const format = (value: bigint) =>
    formatUnits(value, config.saleToken[chain.id].decimals);

  return {
    loading,
    parse,
    format,
    buyToken,
    addTokenAsset,
    fetchIntialData,
    fetchLockedBalance,
    fetchTokenBalances,
  };
};

export default useWeb3Functions;
