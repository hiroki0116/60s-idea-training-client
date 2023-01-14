import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
// third party
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Divider from 'antd/lib/divider';
import GoogleOutlined from '@ant-design/icons/GoogleOutlined';
// utils 
import { APIWithoutAuth } from 'utils/api';
import { signInWithGoogle,saveUserAndToken } from 'utils/auth';
import { AuthContext } from 'context/authContext';


const SignUpOrLoginModal = () => {
  const { showLoginOrRegister, setShowLoginOrRegister } = useContext(AuthContext);

  const toggleModal = () =>{
    setShowLoginOrRegister(false);
  }

  return (
    <Modal
      visible={showLoginOrRegister}
      onCancel={toggleModal}
      footer={null}
      maskClosable={false}
      className="w-full m-auto"
      width={500}
      centered
    >
      <SignUpOrLogin />
    </Modal>
  );
};

const SignUpOrLogin = () => {
  const { setShowLoginOrRegister, setShowLogin, setShowRegister,setUser } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleGoogleSignIn = () => {
    const props = {
      setLoading,
      setShowLogin,
      setUser,
      message,
      router
    }
    signInWithGoogle(props)
  }

  const handleSubmit = async (formValues) => {
    setLoading(true);
    try {
      window.localStorage.setItem('emailForSignIn', formValues.email.toLowerCase());
      const {data} = await APIWithoutAuth.get(`/users/?email=${formValues.email.toLowerCase()}`);
      setShowLoginOrRegister(false);
      if (data.success) {
        setShowLogin(true);
      } else {
        setShowRegister(true);
      }
    } catch (error: any) {
      message.error("Email cannot be found.")
      setShowRegister(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="p-8">
        <p className="font-semibold text-lg pb-3">Log in to continue</p>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{ email: window.localStorage.getItem('emailForSignIn') }}
        >
          <Form.Item
            name="email"
            validateFirst
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Please enter your email' },
              { whitespace: true, message: 'Email cannot be empty' },
              { type: 'email', message: 'Not valid email' }
            ]}
            required
            normalize={(value) => value.trim()}
          >
            <Input className="p-2 rounded-lg font-dark-gray text-16" placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit" className="w-full h-10 rounded-lg">
              Continue
            </Button>
          </Form.Item>
          <Divider plain>OR</Divider>
          <Button  icon={<GoogleOutlined />} className="w-full rounded-lg" onClick={handleGoogleSignIn}>Login with Google</Button>
        </Form>
      </div>
    </Spin>
  );
};

export { SignUpOrLoginModal };

export default SignUpOrLogin;
