import Image from "next/image";
import { DESKTOP_MOCKUP, MOBILE_MOCKUP, HERO_IMAGE } from "utils/constants";

const HeroSection = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 justify-items-center sm:max-w-6xl sm:mx-auto px-5 sm:px-5 md:px-5 lg:px-5 xl:px-0">
      <div className="flex gap-10 pt-28">
        <div className="pt-14">
          <h2 className="text-base uppercase tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-500 to-gray-500">
            Free of charge
          </h2>
          <h3 className="sm:text-4xl text-2xl font-extrabold">
            Maximise your <br />
            thinking ability,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-500 to-gray-500">
              now!
            </span>
          </h3>
          <p className="sm:text-lg text-base font-bold leading-8 tracking-wide">
            Do you know that output training brings you lots of benefits?
            <br />
            It helps your work productivity, study and even your mental health!
            <br />
            This App will work on your brainstorming exercise in a limited time
            like pomodoro clock.
          </p>
        </div>
        <div className="self-center sm:block hidden">
          <Image
            src={HERO_IMAGE}
            alt="Hero Idea image"
            width={350}
            height={250}
          />
        </div>
      </div>

      <div className="flex sm:gap-20 gap-5">
        <div>
          <Image
            src={MOBILE_MOCKUP}
            alt="Mobile Mockup"
            width={160}
            height={300}
          />
        </div>
        <div>
          <Image
            src={DESKTOP_MOCKUP}
            alt="Desktop Mockup"
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
