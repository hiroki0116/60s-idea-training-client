import Link from 'next/link';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';

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
