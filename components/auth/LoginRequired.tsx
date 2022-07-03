import { Result, Button } from 'antd';
import Link from 'next/link';

const LoginRequired = () => {

  return (
    <Result
      className="bg-white m-10"
      status="403"
      title='Please Login first to access your dashboard.'
      extra={
        <Link href={'/'}>
          <Button type="primary" shape='round'>Home Page</Button>
        </Link>
      }
    />
  );
};

export default LoginRequired;
