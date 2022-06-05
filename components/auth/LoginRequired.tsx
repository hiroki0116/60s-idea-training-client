import { Result, Button } from 'antd';
import Link from 'next/link';

const LoginRequired = () => {

  return (
    <Result
      className="bg-white m-10"
      status="403"
      title="401"
      subTitle="Please login to continue."
      extra={
        <Link href={'/'}>
          <Button type="primary">Home Page</Button>
        </Link>
      }
    />
  );
};

export default LoginRequired;