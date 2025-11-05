import { Chain, bsc, bscTestnet } from "wagmi/chains";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID as string;
if (!projectId) throw new Error("Missing VITE_REOWN_PROJECT_ID");

// Use both chains on localhost, otherwise only BSC
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const chains = (isLocalhost ? [bsc, bscTestnet] : [bsc]) as [
  Chain,
  ...Chain[]
];

// Create the WagmiAdapter FIRST
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: chains,
});

// Export the wagmi config from the adapter
export const wagmiConfig = wagmiAdapter.wagmiConfig;

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains,
  metadata: {
    name: "PBA Presale",
    description: "PBA",
    url: "https://pba-presale.vercel.app",
    icons: ["https://pba-presale.vercel.app/img/logo.png"],
  },
  features: {
    analytics: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-z-index": 9999,
  },
});
