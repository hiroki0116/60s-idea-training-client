import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Spin, Divider, Checkbox, Button, Modal, message } from 'antd';

import { auth, firebase_auth } from 'utils/firebase';
import { AuthContext } from 'context/authContext';
import { saveUserAndToken } from 'utils/auth';
import { APIWithoutAuth } from 'utils/api';

const RegisterModal = () => {
  const { showRegister, setShowRegister } = useContext(AuthContext);

  return (
    <Modal
      visible={showRegister}
      onCancel={() => {
        setShowRegister(false);
      }}
      footer={null}
      maskClosable={false}
      className="w-full m-auto"
      width={500}
      centered
    >
      <Register />
    </Modal>
  );
};

const Register = () => {
  const {
    setUser,
    setShowRegister,
    setShowLogin,
    afterPath,
    setAfterPath,
    ipAddress,
    showRegister,
    setIsApply
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const [terms, setTerms] = useState(true);

  useEffect(() => {
    showRegister &&
      form.setFieldsValue({
        email: window.localStorage.getItem('emailForSignIn')
      });
  }, [showRegister]);

  const checkEmailExists = () => ({
    async validator(_, value) {
      if (value) {
        const res = await APIWithoutAuth.post(`/auth/check/email?email=${value.toLowerCase()}`);
        if (res.data.exists) {
          return Promise.reject('We found an existing account with this email. Please click Login below.');
        }
      }
      return Promise.resolve();
    }
  });

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const { email, password, firstName, lastName } = values;


      const userInfo = {
        email: email.toLowerCase().trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };

      const registerRes = await APIWithoutAuth.post('/auth/register/email', {
        ...userInfo,
        redirectPath: router.asPath
      });

      if (!registerRes.data.success) {
        setLoading(false);
        message.error(registerRes.data.message);
        return;
      }

      await auth.setPersistence(firebase_auth.Auth.Persistence.LOCAL);
      const loginRes = await auth.signInWithEmailAndPassword(email.toLowerCase().trim(), password);
      const { user } = loginRes;
      const idTokenResult = await user.getIdTokenResult();
      const userFromDB = registerRes.data.user;
      setUser(userFromDB);
      saveUserAndToken(userFromDB, idTokenResult.token);

      form.resetFields();
      message.success('Account created successfully.');

      setLoading(false);
      setShowRegister(false);
      router.push('/dashboard');
      return;
    } catch (error: any) {
      await APIWithoutAuth.post('/error-message', { clientError: error.message });
      setLoading(false);
      message.error(error.response ? error.response.data.message : 'Error in register. Please try again later.');
    }
  };

  const handleFormOnKeyPress = (e) => {
    if (e.which === 13 /* Enter */) {
      e.preventDefault();
    }
  };

  const commonItem = () => {

    return (
      <>

        <div className="flex items-start mb-8">
          <div className="mr-2">
            <Checkbox checked={terms} onChange={(e) => setTerms(e.target.checked)}></Checkbox>
          </div>

          <div className="font-dark-gray">
            I agree to 60seconds Idea Training&nbsp;
            <Link href="#">
              <a target="_blank">
                <Button type="link" className="whitespace-normal h-auto p-0">
                  Terms of Service
                </Button>
              </a>
            </Link>
            &nbsp;and&nbsp;
            <Link href="#">
              <a target="_blank">
                <Button type="link" className="whitespace-normal h-auto p-0">
                    Privacy Policy
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const emailForm = () => (
    <Form form={form} onFinish={handleSubmit} onKeyPress={handleFormOnKeyPress}>
      <span className="grid grid-cols-2 gap-4 mt-3">
        <Form.Item
          name="firstName"
          rules={[
            { required: true, message: 'Please enter your first name' },
            { whitespace: true, message: 'First name cannot be empty' },
            { max: 15, message: 'First name cannot be longer than 15 characters' }
          ]}
          required
        >
          <Input className="p-2 rounded font-dark-gray text-16" placeholder="First name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: 'Please enter your last name' },
            { whitespace: true, message: 'Last name cannot be empty' },
            { max: 15, message: 'Last name cannot be longer than 15 characters' }
          ]}
          required
        >
          <Input className="p-2 rounded font-dark-gray text-16" placeholder="Last name" />
        </Form.Item>
      </span>

      <Form.Item
        name="email"
        validateFirst
        validateTrigger="onBlur"
        rules={[
          { required: true, message: 'Please enter your email' },
          { whitespace: true, message: 'Email cannot be empty' },
          { type: 'email', message: 'Not valid email' },
          checkEmailExists
        ]}
        required
        normalize={(value) => value.trim()}
      >
        <Input className="p-2 rounded font-dark-gray text-16" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please enter password' },
          { whitespace: true, message: 'Password cannot be empty' }
        ]}
        required
      >
        <Input.Password className="p-2 rounded font-dark-gray" placeholder="Password" disabled={loading} />
      </Form.Item>
      {commonItem()}
      <Button className="w-full rounded h-auto py-2 mb-2" htmlType="submit" type="primary" disabled={loading || !terms}>
        Sign Up
      </Button>
      <Divider />
    </Form>
  );

  return (
    <Spin spinning={loading}>
      <div className="p-6">
        {emailForm()}
        <div className="font-dark-gray text-center">
          Already have an account?
          <Button
            type="link"
            onClick={() => {
              setIsApply(false);
              setShowRegister(false);
              setShowLogin(true);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export { Register, RegisterModal };
