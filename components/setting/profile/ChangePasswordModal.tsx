import { useState } from 'react';
import router from 'next/router';
//Components
import LoginRequired from 'components/auth/LoginRequired';
//Third Party
import { message, Modal } from 'antd'
//Utils
import { API } from 'utils/api';
import { auth } from 'utils/firebase';
import { isAuth } from 'utils/auth';
import { Spin, Form, Input, Button } from 'antd';


type modalProps = {
  showChangePasswordModal: boolean;
  setShowChangePasswordModal:(value: boolean) => void;
}

const ChangePasswordModal = ({showChangePasswordModal, setShowChangePasswordModal}: modalProps) => {
  
  return (
    <Modal
      visible={showChangePasswordModal}
      onCancel={() => {
        setShowChangePasswordModal(false);
      }}
      footer={null}
      maskClosable={false}
      className="w-full m-auto"
      width={500}
      getContainer={false}
    >
      <ChangePassword showChangePasswordModal={showChangePasswordModal} setShowChangePasswordModal={setShowChangePasswordModal} />
    </Modal>
  );
};

const ChangePassword = ({showChangePasswordModal, setShowChangePasswordModal}: modalProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await auth.currentUser.updatePassword(password);
      await API.put('/user', { tempPassword: '' });
      setLoading(false);
      message.success('Password update success.');
      router.push('/user/account-settings/security');
    } catch (err) {
      setLoading(false);
      message.error('Please login again. Your session has been expired.');
    }
  };

  const passwordChangeForm = () => (
    <Form className="w-full" onFinish={handleSubmit}>
      <Form.Item name="password">
        <Input.Password
          className="p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Password is not identical.');
            }
          })
        ]}
      >
        <Input.Password
          className="p-2 rounded"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="w-full rounded" disabled={loading}>
        Submit
      </Button>
    </Form>
  )

  return isAuth() ? (
    <Spin spinning={loading}>
      <div className="p-6">
        {passwordChangeForm()}
      </div>
    </Spin>
  ) : (
    <LoginRequired />
  );
};

export { ChangePasswordModal }