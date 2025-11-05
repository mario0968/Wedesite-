import FadeRight from "../animations/FadeRight";
import BuyForm from "../BuyForm";

const HeroSection = () => {
  return (
    <section className="text-center py-10 bg-gradient-to-br from-black to-gray-900">
      <div className="container mx-auto px-5">
        {/* Hero Images */}
        <div className="flex flex-wrap gap-5 justify-center items-center mb-8">
          <img
            src="https://i.ibb.co/b5NP3XmV/IMG-20251002-WA0164-2.jpg"
            alt="ShibaX Hero 1"
            className="max-w-[45%] h-auto rounded-xl shadow-2xl transition-transform hover:-translate-y-1"
          />
          <img
            src="https://i.ibb.co/xK60Yf3h/IMG-20251002-WA0324.jpg"
            alt="ShibaX Hero 2"
            className="max-w-[45%] h-auto rounded-xl shadow-2xl transition-transform hover:-translate-y-1"
          />
        </div>

        {/* Buy Widget - Centered */}
        <div className="my-12">
          <FadeRight className="relative flex w-full justify-center">
            <div className="w-full max-w-2xl">
              <BuyForm />
            </div>
          </FadeRight>
        </div>

        {/* Banner Image */}
        <div className="text-center my-8">
          <img
            src="https://i.ibb.co/Z6Jf9Khc/IMG-20250915-WA0166.jpg"
            alt="ShibaX Banner"
            className="w-full max-w-2xl h-auto rounded-xl shadow-[0_8px_24px_rgba(255,215,0,0.3)] mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

