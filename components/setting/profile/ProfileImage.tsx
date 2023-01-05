import { useState, useContext } from "react";
//Components
import { AuthContext } from "context/authContext";
import ConfirmModal from "components/Layout/ConfirmModal";
//ThirdParty
import Resizer from "react-image-file-resizer";
import { Spin, Avatar, message } from "antd";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import DeleteFilled from "@ant-design/icons/DeleteFilled";
//Utils
import { currAuthUser, setLocalStorage } from "utils/auth";
import { API, APIWithoutAuth } from "utils/api";
import { DEFAULT_USER_IMAGE } from 'utils/constants';
//Types
import { IPhoto } from "types/Photo";

const ProfileImage = () => {
  const [image, setImage] = useState<IPhoto | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { setUser } = useContext(AuthContext);

  const handleDeleteAvatar = async () => {
    try {
      setShowConfirm(false);
      setLoading(true);
      if (image) {
        await API.put("/users/images", { public_id: image.public_id });
      }
    //Update user in db
    const response = await API.put(`/users/${currAuthUser()?._id}`, {
        images: [{ about: `default`, url: DEFAULT_USER_IMAGE}],
    });
      //Update context
      setUser(response.data.data);
      //Update local storage
      setLocalStorage("user", response.data.data);
    } catch (error: any) {
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
      e.preventDefault();
      setLoading(true);
      setDragOver(false);
      const file = e?.dataTransfer?.files[0];
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("Please upload JPG or PNG file.");
        return;
      }

      const folder = `${process.env.NEXT_PUBLIC_STAGE}/users/user_profile/${
        currAuthUser()._id
      }`;

      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        async (uri) => {
            setLoading(true);
            const response = await API.post("/users/images", {
              image: uri,
              folder,
            });
            if (image) {
              await API.put("/users/images", { public_id: image.public_id });
            }
  
            //Update user in db
            const userRes = await API.put(`/users/${currAuthUser()?._id}`, {
              images: [{ about: `profile_image_${currAuthUser()?.firstName}`, url: response.data.data.url}],
            });
            //Update context
            setUser(userRes.data.data);
            //Update local storage
            setLocalStorage("user", userRes.data.data);
            setImage(userRes.data.data.images[0].url);
            setLoading(false);
        },
        "base64",
        200,
        200
      );
    } catch (error: any) {
      await APIWithoutAuth.post(
        "/error-message/",
        { message: error.message },
        { errorHandle: false }
      );
      message.error("Upload error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAvatar = async (e: any) => {
    try {
      const file = e.target.files[0];
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("Please upload JPG or PNG file.");
        return;
      }
      if (file.size > 5e6) {
        message.error("File size should be less than 5 MB.");
        return;
      }

      const folder = `${
        process.env.NEXT_PUBLIC_STAGE
      }/users/user_profile/${currAuthUser()._id}`;

      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        async (uri) => {
          setLoading(true);
          const response = await API.post("/users/images", {
            image: uri,
            folder,
          });
          if (image) {
            await API.put("/users/images", { public_id: image.public_id });
          }

          //Update user in db
          const userRes = await API.put(`/users/${currAuthUser()?._id}`, {
            images: [{ about: `profile_image_${currAuthUser()?.firstName}`, url: response.data.data.url}],
          });
          //Update context
          setUser(userRes.data.data);
          //Update local storage
          setLocalStorage("user", userRes.data.data);
          setImage(response.data.data);
          setLoading(false);
        },
        "base64",
        200,
        200
      );
    } catch (error: any) {
      message.error("Upload error");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg dark:bg-slate-900">
      <div className="font-bold py-3 px-5 bg-blue-50 overflow-hidden rounded-t-lg text-base dark:text-slate-900">
        Profile Image
      </div>

      <div className="grid grid-cols-2 sm:px-16 px-5 dark:bg-slate-800">
        <div
          className="mb-8 mt-4 cols-span-1"
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <Spin spinning={loading}>
            <DeleteFilled
              hidden={!showDelete}
              onClick={() => setShowConfirm(true)}
              className="absolute top-0 left-0 hover:text-blue-800"
            />
            <Avatar
              className="mx-2"
              size={120}
              src={currAuthUser()?.images?.length && currAuthUser()?.images[0].url}
            />
          </Spin>
        </div>
        <div
          className={`col-span-1 flex flex-col justify-center items-center text-gray-600 border rounded cursor-pointer my-4 ${
            dragOver ? "bg-blue-50 border" : "border-dashed"
          }`}
        >
          <Spin spinning={loading}>
            <label
              htmlFor="file_upload"
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="flex flex-col justify-center items-center hover:opacity-75">
                <UploadOutlined className="text-xl sm:text-4xl font-bold" />
                <div className="ml-3 font-bold text-center">
                  Click or Drag &amp; Drop to upload
                </div>
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
  );
};

export default ProfileImage;
