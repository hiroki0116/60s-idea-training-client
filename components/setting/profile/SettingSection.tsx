import { useState } from 'react';
//Third Party
import Card from 'antd/lib/card';
import Avatar from 'antd/lib/avatar';
import MailOutlined from '@ant-design/icons/MailOutlined';
import KeyOutlined from '@ant-design/icons/KeyOutlined';
//Components
import {ChangeEmailModal} from 'components/setting/profile/ChangeEmailModal';
import {ChangePasswordModal} from 'components/setting/profile/ChangePasswordModal';

const {Meta} = Card;

const SettingSection = () => {
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  return (
    <div className='bg-white rounded-lg shadow-lg dark:bg-slate-900'>
        <div className='font-bold py-3 px-5 bg-blue-50 overflow-hidden rounded-t-lg text-base dark:text-slate-900'>
            Account
        </div>

        <div className='flex place-content-center dark:bg-slate-800'>
          <Card
              hoverable
              className='text-center w-full dark:bg-slate-900 dark:border-none hover:dark:bg-slate-800'
              style={{borderRadius:'0.5rem', margin:'1rem'}}
              onClick={()=>setShowChangeEmailModal(!showChangeEmailModal)}
            >
              <Meta 
                title={
                  <div style= {{textAlign: "center"}}>
                    <Avatar 
                      size={60} 
                      className="bg-gray-800 mb-3" 
                      gap={0} 
                      icon={<MailOutlined className="w-full" />} 
                    />
                  </div>
                }
                description={
                  <>
                    <div className='text-gray-700 font-bold dark:text-white'>Change Email</div>
                  </>
                }
              />
          </Card>

          <Card
              hoverable
              className='text-center w-full dark:bg-slate-900 dark:border-none hover:dark:bg-slate-800'
              style={{borderRadius:'0.5rem', margin:'1rem'}}
              onClick={()=>setShowChangePasswordModal(!showChangePasswordModal)}
            >
              <Meta 
                title={
                  <div style= {{textAlign: "center"}}>
                    <Avatar 
                      size={60} 
                      className="bg-gray-800 mb-3" 
                      gap={0} 
                      icon={<KeyOutlined className="w-full" />} 
                    />
                  </div>
                }
                description={
                  <>
                    <div className='text-gray-700 font-bold dark:text-white'>Change Password</div>
                  </>
                }
              />
          </Card>
        </div>
        <ChangeEmailModal {...{showChangeEmailModal,setShowChangeEmailModal}} />
        <ChangePasswordModal {...{showChangePasswordModal, setShowChangePasswordModal}} />
    </div>
  )
}

export default SettingSection