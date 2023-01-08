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
import { AuthContext } from 'context/authContext';
import isEmpty from 'lodash/isEmpty';
// utils 
import { APIWithoutAuth } from 'utils/api';
import { auth } from 'utils/firebase';
import { saveUserAndToken } from 'utils/auth';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

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

  const provider = new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' });
  const signInWithGoogle = () => signInWithPopup(auth,provider)
  .then(async (result:any)=>{
    setLoading(true)
    const user = result.user;
    const {data} = await APIWithoutAuth.get(`/users/?email=${user.email}`);
    // if user is not in database, create new user
    if (isEmpty(data.data)) {
      const {data} = await APIWithoutAuth.post('/users/signup', {
        email: user.email,
        firstName: user.displayName,
        lastName: 'User',
        firebaseUID: user.uid,
        images: [{
          url: user.photoURL,
          about: 'Google profile image'
        }]
      });
      setUser(data.data);
      saveUserAndToken(data.data, user.accessToken );
      message.success('Login success.');
      setShowLogin(false)
      router.push('/dashboard');
      return;
    }
    setUser(data.data);
    setLoading(false);
    saveUserAndToken(data.data, user.accessToken);
    message.success('Login success.');
    setShowLogin(false)
    router.push('/dashboard');
  })
  .catch((error) => {
    message.error(error.message);
  })


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
          <Button  icon={<GoogleOutlined />} className="w-full rounded-lg" onClick={signInWithGoogle}>Login with Google</Button>
        </Form>
      </div>
    </Spin>
  );
};

export { SignUpOrLoginModal };

export default SignUpOrLogin;
