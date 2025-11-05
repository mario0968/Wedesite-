const TokenomicsSection = () => {
  const allocations = [
    { percentage: "40%", label: "Product Development" },
    { percentage: "20%", label: "Staking Rewards" },
    { percentage: "15%", label: "Marketing" },
    { percentage: "10%", label: "Exchange Liquidity" },
    { percentage: "10%", label: "Community & Airdrops" },
    { percentage: "5%", label: "Team" },
  ];

  return (
    <section className="bg-gradient-to-br from-[#1b212c] to-[#2a3244] text-yellow-500 py-16 px-5">
      <div className="container mx-auto">
        <h2 className="text-center text-5xl font-bold mb-10 text-yellow-500">
          SHIBAXNOMIC
        </h2>
        <div className="max-w-2xl mx-auto">
          {allocations.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                index !== allocations.length - 1
                  ? "border-b-2 border-white/10"
                  : ""
              } py-5 transition-all duration-300 hover:pl-3 hover:border-yellow-500`}
            >
              <span className="text-3xl font-bold text-yellow-500">
                {item.percentage}
              </span>
              <span className="text-white text-lg">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 text-white text-xl">
          <strong className="text-yellow-500">Total Supply:</strong> 10,000,000,000 ShibaX
        </p>
      </div>
    </section>
  );
};

export default TokenomicsSection;

