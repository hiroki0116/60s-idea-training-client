import { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'context/authContext';
import Router, { useRouter } from 'next/router';

// third party
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Spin from 'antd/lib/spin';
import GoogleOutlined from '@ant-design/icons/GoogleOutlined';
import {setPersistence,browserLocalPersistence,signInWithEmailAndPassword } from 'firebase/auth';
// utils
import { auth } from 'utils/firebase';
import { saveUserAndToken } from 'utils/auth';
import { APIWithoutAuth } from 'utils/api';
import { signInWithGoogle } from "utils/auth"

const LoginModal = () => {
  const { showLogin, setShowLogin } = useContext(AuthContext);

  return (
    <Modal
      visible={showLogin}
      onCancel={() => {
        setShowLogin(false);
      }}
      footer={null}
      className="w-full m-auto"
      maskClosable={false}
    >
      <Login isToggle={true} />
    </Modal>
  );
};

const Login = ({ isToggle }: { isToggle?: boolean }) => {
  const { setShowLogin, setShowRegister, setUser, showLogin, setIsApply } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLessSentMessage, setPasswordLessSentMessage] = useState('');
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (showLogin) {
      setPasswordLessSentMessage('');
      const email = window.localStorage.getItem('emailForSignIn');
      setEmail(email);
    }
  }, [showLogin]);

  useEffect(() => {
    form.setFieldsValue({
      email: email.toLowerCase().trim()
    });
    // setAttemptCount(1);
    // eslint-disable-next-line
  }, [email]);

  useEffect(() => {
    form.setFieldsValue({
      password
    });
    // eslint-disable-next-line
  }, [password]);

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

  const handleForgotPassword = () => {
    isToggle && setShowLogin(false);
    Router.push('/auth/forgot-password');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await setPersistence(auth, browserLocalPersistence);
      const res = await signInWithEmailAndPassword(auth,email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();
      const {data} = await APIWithoutAuth.get(`/users/?email=${user.email}`);

      setUser(data.data);
      setLoading(false);
      saveUserAndToken(data.data, idTokenResult.token);
      form.resetFields();
      message.success('Login success.');
      setShowLogin(false)
      Router.push('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setShowLogin(false);
        setShowRegister(true);
        await APIWithoutAuth.post('/error-message/', { message: error.message }, { errorHandle:false});
        message.error('We cannot find an account associated with this email. Please register.');
        return;
      }
      if (error.code === 'auth/too-many-requests') {
        message.error(error.message);
        await APIWithoutAuth.post('/error-message/', { message: error.message }, { errorHandle:false});
        return;
      }
    //   if (error.code === 'auth/wrong-password') {
    //     if (attemptCount > 2) {
    //       await handlePasswordLessLogin(email);
    //       window.localStorage.setItem('emailForSignIn', email);
    //       setPasswordLessSentMessage(`Check your email! We sent a link to ${email} to help you log in instantly.`);
    //       return;
    //     }
    //     setAttemptCount(attemptCount + 1);
    //   }
      message.error('Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

//   const handlePasswordLessLogin = async (email: string) => {
//     try {
//       setLoading(true);

//       let continueUrl = window.location.href;
//       if (afterPath) {
//         continueUrl = `${window.location.href}${window.location.href.includes('?') ? '&' : '?'}afterPath=${afterPath}`;
//       }

//       await handlePasswordLessEmail(email, continueUrl);
//       window.localStorage.setItem('emailForSignIn', email);

//     } catch (error: any) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       message.error(errorCode + errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <Spin spinning={loading}>
      <div className="p-8">
        {passwordLessSentMessage && (
          <div className="p-2 pl-6 border rounded-lg mb-5 shadow relative bg-gray-50">
            <div className="bg-blue-500 h-full w-4 top-0 left-0 absolute rounded-l-md"></div>
            <p>{passwordLessSentMessage}</p>
          </div>
        )}
        <Form form={form} className="w-full" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Not valid email' }
            ]}
            normalize={(value) => value.trim()}
          >
            <Input
              className="p-2 rounded text-16"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              disabled={loading}
              required
              data-testid="sign-in-email"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password
              className="p-2 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              data-testid="sign-in-password"
            />
          </Form.Item>
          <Form.Item className="my-2">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox onChange={(e) => setRemember(e.target.checked)} checked={remember}>
                Remember me
              </Checkbox>
            </Form.Item>
            <a className="float-right text-red-600 hover:underline" onClick={handleForgotPassword}>
              Forgot password
            </a>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full rounded h-auto py-2 mb-2"
            disabled={loading}
            data-testid="sign-in-submit"
          >
            Log In
          </Button>
          <div className="text-center text-gray-600">or</div>
          <Button  icon={<GoogleOutlined />} className="w-full rounded-lg" onClick={handleGoogleSignIn}>Log in with Google</Button>
        </Form>
        <Divider />
        <div className="flex items-center justify-center">
          <div className="mr-2">You do not have an account yet?</div>
          <Button
            type="link"
            className="p-0 m-0"
            onClick={async () => {
                setIsApply(false);
                setShowLogin(false);
                setShowRegister(true);
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export { Login, LoginModal };
