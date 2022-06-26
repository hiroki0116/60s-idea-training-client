import { useContext } from 'react';
import { AuthContext } from 'context/authContext';
//ThirdParty
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined'
//Utils
import { currAuthUser } from 'utils/auth';
import { SETTING_BACKGROUND }  from 'utils/constants';
import { capitalizeFirst } from 'utils/formatter';
//Components
import MotionDiv from 'components/Layout/MotionDiv';
import ProfileImage from 'components/setting/profile/ProfileImage';

const ProfileSection = () => {
  const { user } = useContext(AuthContext);

  const embedImage = (url: string) => {return {
    backgroundImage: `url(${url})`,
    backgroundPosition: 'center',
    backgroundRepeat:'no-repeat',
    backgroundSize: 'cover'
  }}

  return (
    <div className='flex flex-col relative'>
      <div className="h-36 rounded-lg shadow-lg" style={embedImage(SETTING_BACKGROUND)}>
        <div className='text-white font-bold p-5 text-lg tracking-wider'>Profile</div>
      </div>
      <div className="top-20 left-1/2 absolute">
        <div className="shadow-xl rounded w-20 h-20 relative right-1/2" style={embedImage(user ? user.images[0].url : currAuthUser()?.images[0]?.url)} />
      </div>
      <div className='mt-8 mb-5 grid grid-cols-1 justify-items-center'>
        <div className='text-lg font-bold'>{capitalizeFirst(currAuthUser()?.firstName)} {capitalizeFirst(currAuthUser()?.lastName)}</div>
        <div className='flex items-center gap-1'><EnvironmentOutlined/> Australia</div>
      </div>
      <MotionDiv>
        <div className='grid grid-cols-2 gap-5'>
          <div className='bg-white rounded-lg shadow-lg p-5'>
            
          </div>
          <ProfileImage />
        </div>
      </MotionDiv>
    </div>
  )
}

export default ProfileSection