import Result from "antd/lib/result";
import Button from "antd/lib/button";

const LoginRequired = () => {
  return (
    <Result
      className="bg-white m-10"
      status="403"
      title="Please Login first to access your dashboard."
      extra={
        <Button type="primary" shape="round" href="/">
          Home Page
        </Button>
      }
    />
  );
};

export default LoginRequired;
