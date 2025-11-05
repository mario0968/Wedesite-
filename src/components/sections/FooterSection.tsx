import BuyForm from "../BuyForm";
import FadeRight from "../animations/FadeRight";

const FooterSection = () => {
  return (
    <>
      {/* CTA Section with Buy Widget */}
      <section className="bg-gradient-to-br from-yellow-300 to-yellow-400 text-black py-20 px-5 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-[2px_2px_rgba(0,0,0,0.1)]">
            READY TO LAUNCH WITH SHIBAX? 🚀
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Join the revolution where memes meet real utility.
            <br />
            No rugs, no fear — just real degens, real support, and real purpose.
          </p>

          {/* Buy Widget in CTA */}
          <div className="my-12">
            <FadeRight className="relative flex w-full justify-center">
              <div className="w-full max-w-2xl">
                <BuyForm />
              </div>
            </FadeRight>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <span className="bg-black text-yellow-300 rounded-full px-8 py-4 font-bold text-base">
              🔐 SAFE
            </span>
            <span className="bg-black text-yellow-300 rounded-full px-8 py-4 font-bold text-base">
              📈 VIRAL
            </span>
            <span className="bg-black text-yellow-300 rounded-full px-8 py-4 font-bold text-base">
              👥 COMMUNITY-DRIVEN
            </span>
          </div>
          <p className="mt-6 text-base text-gray-800 font-semibold">
            #NoRugJustRise
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-12 px-5">
        <h3 className="text-3xl mb-5 transition-all duration-300 hover:drop-shadow-[0_0_10px_#fedd00]">
          <span className="text-white">Shiba</span>
          <span className="text-yellow-300">X</span>
        </h3>
        <div className="my-6 leading-loose">
          <a
            href="/terms"
            className="text-white no-underline mx-4 inline-block relative transition-all duration-300 hover:text-yellow-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-0.5 after:left-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Terms of Service
          </a>
          <a
            href="/cookies"
            className="text-white no-underline mx-4 inline-block relative transition-all duration-300 hover:text-yellow-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-0.5 after:left-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Cookies
          </a>
          <a
            href="/privacy"
            className="text-white no-underline mx-4 inline-block relative transition-all duration-300 hover:text-yellow-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-0.5 after:left-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Privacy Policy
          </a>
        </div>
        <a
          href="https://t.me/+AxxSUhlmfmM1MmIx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 no-underline text-blue-500 font-semibold mt-5 transition-all duration-300 px-6 py-3 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-white hover:scale-105"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
            alt="Telegram"
            className="w-6 h-6"
          />
          ShibaX Telegram Group
        </a>
        <p className="mt-8 text-sm text-gray-400 leading-relaxed max-w-4xl mx-auto">
          $ShibaX Token is a speculative meme coin asset fueled by community
          energy, freedom-first ideals, and decentralized ambition. The
          cryptocurrency market carries risk — including the loss of all capital.
          Nothing on this website constitutes financial advice.
        </p>
      </footer>
    </>
  );
};

export default FooterSection;

