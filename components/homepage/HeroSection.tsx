import Image from 'next/image';
import { DESKTOP_MOCKUP,MOBILE_MOCKUP, HERO_IMAGE } from 'utils/constants';

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-2 px-28 justify-items-center">
      <div className='cols-1'>
        <div className='pt-52'>
          <h2 className='text-base uppercase tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-500 to-gray-500'>Free of charge</h2>
          <h3 className='text-4xl font-extrabold'>Maximise your <br/>thinking ability, <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-500 to-gray-500'>now!</span></h3>
          <p className='text-lg font-bold'>Do you know that output training brings you lots of benefits?</p>
          <p className='text-lg font-bold'>It helps your work productivity, study and even your mental health!</p>
        </div>
        <div className='flex pt-5 gap-5'>
          <Image src={DESKTOP_MOCKUP} alt='Desktop Mockup' width={400} height={300}/>
          <Image src={MOBILE_MOCKUP} alt='Mobile Mockup' width={150} height={50}/>
        </div>
      </div>
      <div className='cols-1 self-center justify-self-center'>
        <Image src={HERO_IMAGE} alt="Hero Idea image" width={400} height={270} />
      </div>
    </div>
  )
}

export default HeroSection