import { useState, useContext, Dispatch, SetStateAction } from "react";
import { AuthContext } from "features/auth/stores/context/authContext";
import { DEFAULT_USER_IMAGE } from "utils/constants";
import { currAuthUser, setLocalStorage } from "utils/auth_functions";
import { userRespository } from "api-client/repositories/user_repository";
import message from "antd/lib/message";

export const useDeleteProfileImage = (): {
  showConfirm: boolean;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
  deleteLoading: boolean;
  handleDeleteAvatar: () => Promise<void>;
} => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { setUser } = useContext(AuthContext);

  const handleDeleteAvatar = async () => {
    try {
      setShowConfirm(false);
      setDeleteLoading(true);
      // update in cloudinary
      await userRespository.updateProfileImage(
        currAuthUser()?.images[0]?.public_id
      );
      // update user in db
      const response = await userRespository.updateUser(currAuthUser()?._id, {
        images: [{ about: `default`, url: DEFAULT_USER_IMAGE }],
      });
      setUser(response);
      setLocalStorage("user", response);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return { showConfirm, setShowConfirm, deleteLoading, handleDeleteAvatar };
};
