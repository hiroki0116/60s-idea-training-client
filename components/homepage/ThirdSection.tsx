import Image from 'next/image';
import MotionDivWhenView from 'components/Layout/MotionDivWhenView';
import {THIRD_SECTION} from 'utils/constants';
import FieldTimeOutlined from '@ant-design/icons/FieldTimeOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import ReadOutlined from '@ant-design/icons/ReadOutlined';

const ThirdSection = () => {
  return (
    <div className="min-h-screen w-full grid sm:grid-cols-2 grid-cols-1 tracking-wider sm:py-20 py-10 gap-10 sm:px-28 px-10" >
        <div className="col-span-1">

            <h3 className="sm:text-4xl text-2xl">How it works?</h3>
            <div className="col-span-1 self-center justify-self-center block sm:hidden">
                <Image src={THIRD_SECTION} alt='Man adding data' width={500} height={350} />
            </div>
            <div className="sm:text-lg text-base font-bold pb-5">Simple rules! Brainstorming within 60 seconds! Easy to continue everyday!</div>

            <MotionDivWhenView variants = {{visible: { opacity: 1, x: 0 },hidden: { opacity: 0, x: 10 }}}>
                <div className="grid grid-cols-1 gap-5 pt-5">
                    <div className="flex p-5 gap-8 rounded-lg shadow-lg bg-blue-50 transform transition duration-500 hover:scale-110">
                        <FieldTimeOutlined className='text-6xl'/>
                        <div>
                            <p className="text-xl font-bold">60 seconds only</p>
                            <p className="sm:text-base text-sm leading-5">You have 60 seconds for each session. You don&apos;t have to structure your thoughts! Try to come up with ideas as much as you can in 60 seconds.</p>
                        </div>
                    </div>
                    <div className="flex p-5 gap-8 rounded-lg shadow-lg bg-blue-50 transform transition duration-500 hover:scale-110">
                        <ProfileOutlined className='text-6xl'/>
                        <div>
                            <p className="text-xl font-bold">5 sessions a day</p>
                            <p className="text-base">Idealy, you come up with 4 or 5 ideas per session.</p>
                            <p className='sm:text-base text-sm bg-gray-200 p-1 text-center rounded-lg'>5 sessions * 60 seconds = 5 mins / Day</p>
                        </div>
                    </div>
                    <div className="flex p-5 gap-8 rounded-lg shadow-lg bg-blue-50 transform transition duration-500 hover:scale-110">
                        <ReadOutlined className='text-6xl'/>
                        <div>
                            <p className="text-xl font-bold">Make a Note</p>
                            <p className="sm:text-base text-sm leading-5">You can review your sessions and make an organised note for your better ideas.</p>
                        </div>
                    </div>
                </div>
            </MotionDivWhenView>
        </div>
        <div className="col-span-1 self-center justify-self-center sm:block hidden">
            <Image src={THIRD_SECTION} alt='Man adding data' width={500} height={350} />
        </div>
    </div>
  )
}

export default ThirdSection