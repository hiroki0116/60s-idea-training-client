import { Dispatch, SetStateAction, useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "config/firebase";
import message from "antd/lib/message";

const useUpdatePassword = (
  setShowChangePasswordModal: (sC: boolean) => void
): {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  loading: boolean;
  handleSubmit: () => Promise<void>;
} => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, password);
      setLoading(false);
      setShowChangePasswordModal(false);
      message.success("Password update success.");
    } catch (err) {
      setLoading(false);
      message.error("Please login again. Your session has been expired.");
    }
  };

  return { password, setPassword, loading, handleSubmit };
};

export default useUpdatePassword;
