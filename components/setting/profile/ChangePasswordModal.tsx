import { useState } from 'react';
//Components
import LoginRequired from 'components/auth/LoginRequired';
//Third Party
import { message, Modal } from 'antd'
import { updatePassword } from 'firebase/auth';
//Utils
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
      <ChangePassword setShowChangePasswordModal={setShowChangePasswordModal} />
    </Modal>
  );
};

const ChangePassword = ({ setShowChangePasswordModal}: {setShowChangePasswordModal:(boolean) => void}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, password);
      setLoading(false);
      setShowChangePasswordModal(false);
      message.success('Password update success.');
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