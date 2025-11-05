import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Shibax?",
      answer:
        "Shibax is a cryptocurrency token designed to provide users with opportunities in presale, staking, and transactions on our platform. It is based on transparent and secure blockchain technology.",
    },
    {
      question: "How can I buy Shibax?",
      answer:
        "You can purchase Shibax through our presale platform or on DEX/CEX that support the token. Connect your wallet (MetaMask or Trust Wallet), follow the instructions on the presale page, and complete the transaction to receive your tokens.",
    },
    {
      question: "Does Shibax offer staking or rewards?",
      answer:
        "Yes. We plan to implement a staking system where users can stake their tokens and earn regular interest or rewards according to the staking rules.",
    },
    {
      question: "Is Shibax secure?",
      answer:
        "We use blockchain technology to verify all transactions. All smart contract codes have been audited to minimize risks. However, users are always responsible for the security of their wallets.",
    },
    {
      question: "What are the future plans for Shibax?",
      answer:
        "Our development roadmap includes listing on DEX and CEX, integration with DeFi platforms, launching staking and reward systems, and expanding the ecosystem through partnerships and community growth.",
    },
    {
      question: "Where can I get more information or support?",
      answer: (
        <>
          You can contact us via email:{" "}
          <a href="mailto:Shibashibax20@gmail.com" className="text-yellow-400 hover:text-yellow-300">
            Shibashibax20@gmail.com
          </a>
        </>
      ),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-16 px-5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-center text-5xl text-yellow-400 mb-12 font-bold">
          Shibax FAQ
        </h2>
        <div>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-[#111] rounded-xl mb-5 overflow-hidden border-l-[6px] border-yellow-400 transition-all duration-300 hover:bg-[#1a1a1a] ${
                  isOpen ? "open" : ""
                }`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer p-6 text-xl font-bold text-white"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center">
                    <span
                      className={`text-yellow-400 text-2xl mr-4 transition-all duration-400 ${
                        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}
                    >
                      ✔
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <span
                    className={`text-lg text-yellow-400 transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    &#9654;
                  </span>
                </div>
                <div
                  className={`text-base leading-relaxed text-gray-400 overflow-hidden transition-all duration-400 ${
                    isOpen ? "max-h-[1000px] px-6 pb-6 pt-4" : "max-h-0"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

