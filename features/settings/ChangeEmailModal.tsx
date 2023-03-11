import { useState, useContext } from "react";
import { AuthContext } from "context/authContext";
//Third Party
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Typography from "antd/lib/typography";
import message from 'antd/lib/message';
//Utils
import { auth } from "utils/firebase";
import {
  signInWithEmailAndPassword,
  updateEmail,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { currAuthUser, saveUserAndToken } from "utils/auth";
import { APIWithoutAuth, API } from "utils/api";

type modalProps = {
  showChangeEmailModal: boolean;
  setShowChangeEmailModal: (value: boolean) => void;
};

const ChangeEmailModal = ({
  showChangeEmailModal,
  setShowChangeEmailModal,
}: modalProps) => {
  return (
    <Modal
      visible={showChangeEmailModal}
      onCancel={() => {
        setShowChangeEmailModal(false);
      }}
      footer={null}
      maskClosable={false}
      className="w-full m-auto"
      width={500}
      getContainer={false}
    >
      <ChangeEmail setShowChangeEmailModal={setShowChangeEmailModal} />
    </Modal>
  );
};

type prop = { setShowChangeEmailModal: (value: boolean) => void };

const ChangeEmail = ({ setShowChangeEmailModal }: prop) => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const checkEmailExists = () => ({
    async validator(_, value) {
      if (value) {
        try {
          const res = await APIWithoutAuth.get(
            `/users/?email=${value.toLowerCase()}`,
            { errorHandle: false }
          );
          if (res.data.success) {
            return Promise.reject(
              "We found an existing account with this email. Please click Login below."
            );
          }
        } catch (error) {
          return Promise.resolve();
        }
      }
    },
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const { email, password } = values;
    const currentEmail = currAuthUser().email.toLowerCase().trim();
    const newEmail = email.toLowerCase().trim();

    // Mongodb update

    const result = await API.put(`/users/${currAuthUser()?._id}`, {
      email: newEmail,
    });
    const userFromDB = result.data.data;
    setUser(userFromDB);

    // Firebase update
    updateEmail(auth.currentUser, newEmail)
      .then(async () => {
        // Update email in mongoDB
        try {
          await setPersistence(auth, browserLocalPersistence);
          const { user } = await signInWithEmailAndPassword(
            auth,
            newEmail,
            password
          );
          const { token } = await user.getIdTokenResult();
          await saveUserAndToken(userFromDB, token);
          window.localStorage.setItem("emailForSignIn", newEmail);
          form.resetFields();
          setLoading(false);
          setShowChangeEmailModal(false);
          message.success(
            "Your email has been changed. Please veriify your new email."
          );
        } catch (error: any) {
          // As Firebase does not feature to revert, we change back to the current email if error occurs in database
          await updateEmail(auth.currentUser, currentEmail).then(async () => {
            await setPersistence(auth, browserLocalPersistence);
            window.localStorage.setItem("emailForSignIn", currentEmail);
            setLoading(false);
            message.error(
              "Failed to update your new email. Please try again later."
            );
          });
        }
      })
      .catch((error: any) => {
        message.error(error.message);
        setLoading(false);
      });
  };

  const handleFormOnKeyPress = (e) => {
    if (e.which === 13 /* Enter */) {
      e.preventDefault();
    }
  };

  const emailForm = () => (
    <Form
      form={form}
      onFinish={handleSubmit}
      onKeyPress={handleFormOnKeyPress}
      initialValues={{ email: "", password: "" }}
    >
      <Typography>
        Change email address for{" "}
        <span className="font-bold">{currAuthUser()?.email}</span>
      </Typography>
      <Form.Item
        name="email"
        validateFirst
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "Please enter your new email" },
          { whitespace: true, message: "Email cannot be empty" },
          { type: "email", message: "Not valid email" },
          checkEmailExists,
        ]}
        required
        normalize={(value) => value.trim()}
      >
        <Input
          className="p-2 rounded font-dark-gray text-16"
          placeholder="New Email"
        />
      </Form.Item>
      <Typography>Current password</Typography>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please enter current password" },
          { whitespace: true, message: "Password cannot be empty" },
        ]}
        required
      >
        <Input.Password
          className="p-2 rounded font-dark-gray"
          value={"new-password"}
          placeholder="Current Password"
          disabled={loading}
        />
      </Form.Item>
      <Button
        className="w-full rounded h-auto py-2 mb-2"
        htmlType="submit"
        type="primary"
        disabled={loading}
      >
        Save email
      </Button>
    </Form>
  );

  return (
    <Spin spinning={loading}>
      <div className="p-6">{emailForm()}</div>
    </Spin>
  );
};

export { ChangeEmail, ChangeEmailModal };
