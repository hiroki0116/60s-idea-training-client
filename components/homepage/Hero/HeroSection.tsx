import Image from 'next/image';
import { DESKTOP_MOCKUP } from 'utils/constants';

const HeroSection = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-2 items-center px-10">
      <div>
        <h3 className='text-base uppercase tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-500 to-gray-500'>Free Forever</h3>
        <Image src={DESKTOP_MOCKUP} alt='Desktop Mockup' width={400} height={300}/>
      </div>
      <div></div>
    </div>
  )
}

export default HeroSection