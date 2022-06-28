import { useState, useContext } from 'react';
//Components
import { AuthContext } from 'context/authContext';
import ConfirmModal from 'components/Layout/ConfirmModal';
//ThirdParty
import Resizer from 'react-image-file-resizer';
import { Spin, Avatar, message } from 'antd';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import DeleteFilled from '@ant-design/icons/DeleteFilled';
//Utils
import { currAuthUser, setLocalStorage } from 'utils/auth';
import { API, APIWithoutAuth } from 'utils/api';
//Types
import {IPhoto} from 'types/Photo';
import CenterSpin from 'components/Layout/CenterSpin';

const ProfileImage = () => {
    const [image, setImage] = useState<IPhoto | null >(null);
    const [dragOver,setDragOver] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const { setUser } = useContext(AuthContext);

    const handleDeleteAvatar = async () => {
        try {
            setShowConfirm(false);
            setLoading(true);
            const res = await API.delete('/images/delete-profile-image');
            //Update context
            setUser(res.data);
            //Update local storage
            setLocalStorage('user', res.data);
        } catch (error:any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
      };
    

    const onDragLeave = () => setDragOver(false);
    const onDragOver = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setDragOver(true);
      };
    const onDrop = async (e: any) => {
        try {
            e.preventDefault()
            setLoading(true);
            setDragOver(false);
            const file = e?.dataTransfer?.files[0];
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if(!isJpgOrPng){
                message.error('Please upload JPG or PNG file.');
                return;
            }

            const uploadFolder = `${process.env.NEXT_PUBLIC_STAGE}/users/user_profile/${currAuthUser()._id}`;

            Resizer.imageFileResizer(
                file,
                500,
                500,
                'JPEG',
                100,
                0,
                async (uri) => {
                  const uploadRes = await API.post('/images/upload', {
                    image: uri,
                    folder: uploadFolder
                  });
                  if (image) {
                    await API.post('/images/remove', { public_id: image.public_id });
                  }
      
                  //Update user in db
                  const userRes = await API.put('/users', {images: [uploadRes.data]});
                  //Update context
                  setUser(userRes.data);
                  //Update local storage
                  setLocalStorage('user', userRes.data);
      
                  setImage(uploadRes.data);
                },
                'base64',
                200,
                200
              );
        } catch (error:any) {
            await APIWithoutAuth.post('/error-message', { clientError: error.message });
            message.error('Upload error');
        } finally {
            setLoading(false);
        }
    }


    const handleChangeAvatar = async (e:any) => {
        try {

            const file = e.target.files[0];
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if(!isJpgOrPng){
                message.error('Please upload JPG or PNG file.');
                return;
            }
            if (file.size > 5e6) {
                message.error('File size should be less than 5 MB.');
                return;
            }

            const uploadFolder = `${process.env.NEXT_PUBLIC_STAGE}/users/user_profile/${currAuthUser()._id}`;

            Resizer.imageFileResizer(
                file,
                500,
                500,
                'JPEG',
                100,
                0,
                async (uri) => {
                    setLoading(true)
                  const uploadRes = await API.post('/images/upload', {
                    image: uri,
                    folder: uploadFolder
                  });
                  if (image) {
                    await API.post('/images/remove', { public_id: image.public_id });
                  }
      
                  //Update user in db
                  const userRes = await API.put('/users', {images: [uploadRes.data]});
                  //Update context
                  setUser(userRes.data);
                  //Update local storage
                  setLocalStorage('user', userRes.data);
                  setImage(uploadRes.data);
                    setLoading(false);
                },
                'base64',
                200,
                200
            );
        } catch (error: any) {
            await APIWithoutAuth.post('/error-message', { clientError: error.message });
            message.error('Upload error');
            setLoading(false);
        } 
    }

  return (
    <div className='bg-white rounded-lg shadow-lg'>
        <div className='font-bold py-3 px-5 bg-blue-50 overflow-hidden rounded-t-lg text-base'>
            Profile Image
        </div>

        <div className='flex px-10'>
            <div
                className="mb-8 sm:mr-8 flex justify-center mt-4"
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
            >
                <Spin spinning={loading}>
                    <DeleteFilled hidden={!showDelete} onClick={()=>setShowConfirm(true)} className="absolute top-0 left-0 hover:text-blue-800"/>
                    <Avatar
                        className="mx-2"
                        size={120}
                        src={currAuthUser()?.images[0].url}
                    />
                </Spin>
            </div>
            <div className={`flex flex-col justify-center items-center text-gray-600 border  rounded cursor-pointer w-full mx-10 my-4 ${dragOver ? 'bg-blue-50 border' : 'border-dashed'}`} >
                <Spin spinning={loading}>
                    <label
                        htmlFor="file_upload" 
                        onDragOver={onDragOver} 
                        onDragLeave={onDragLeave} 
                        onDrop={onDrop}
                    >
                        <div className="flex flex-col justify-center items-center hover:opacity-75">
                        <UploadOutlined className="text-xl sm:text-4xl font-bold" />
                        <div className="ml-3 font-bold text-center">Click or Drag &amp; Drop to upload</div>
                        <div className="hidden">
                            <input
                            type="file"
                            id="file_upload"
                            accept=".png, .jpg"
                            onChange={handleChangeAvatar}
                            />
                        </div>
                        </div>
                    </label>
                </Spin>    
            </div>
            <ConfirmModal
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                handleConfirm={handleDeleteAvatar}
                title="Are you sure to delete this profile photo?"
            />
        </div>
    </div>
  )
}

export default ProfileImage;