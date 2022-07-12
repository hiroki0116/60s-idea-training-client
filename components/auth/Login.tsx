import { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'context/authContext';
import Router, { useRouter } from 'next/router';
import { Divider, Spin, Input, Form, Checkbox, Button, Modal, message } from 'antd';

import { auth } from 'utils/firebase';
import {setPersistence,browserLocalPersistence,signInWithEmailAndPassword } from 'firebase/auth';
import { saveUserAndToken } from 'utils/auth';
import { APIWithoutAuth } from 'utils/api';
// import { handlePasswordLessEmail } from 'services/auth';

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
  const { setShowLogin, setShowRegister, setUser, afterPath, showLogin, setIsApply } = useContext(
    AuthContext
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(1);
  const [passwordLessSentMessage, setPasswordLessSentMessage] = useState('');

  const router = useRouter();

  const [form] = Form.useForm();

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
    setAttemptCount(1);
  }, [email]);

  useEffect(() => {
    form.setFieldsValue({
      password
    });
  }, [password]);

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
      const getUserRes = await APIWithoutAuth.get(`/user?email=${user.email}`);
      const userFromDB = await getUserRes.data.user;

      setLoading(false);

      if (!userFromDB) {
        message.error(getUserRes.data.message);
        return;
      }

      setUser(userFromDB);
      saveUserAndToken(userFromDB, idTokenResult.token);
      form.resetFields();
      message.success('Login success.');
      setShowLogin(false)
      Router.push('/dashboard');
    } catch (err: any) {
      console.log(err);
      if (err.code === 'auth/user-not-found') {
        setShowLogin(false);
        setShowRegister(true);
        message.error('We cannot find an account associated with this email. Please register.');
        return;
      }
      if (err.code === 'auth/too-many-requests') {
        message.error(err.message);
        return;
      }
    //   if (err.code === 'auth/wrong-password') {
    //     if (attemptCount > 2) {
    //       await handlePasswordLessLogin(email);
    //       window.localStorage.setItem('emailForSignIn', email);
    //       setPasswordLessSentMessage(`Check your email! We sent a link to ${email} to help you log in instantly.`);
    //       return;
    //     }
    //     setAttemptCount(attemptCount + 1);
    //   }
      await APIWithoutAuth.post('/error-message', { clientError: err });
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
            Sign In
          </Button>
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
