import React from "react";
import Result from "antd/lib/result";
import Button from 'antd/lib/button';

const AuthError = () => {
  return (
    <>
        <Result
        title={
            <span className="bg-slate-900/text-primary rounded font-extrabold tracking-normal">
                Authentication error...<br/>Please go back and Login
            </span>
        }
        status="403"
        />
        <div className="text-center">
            <Button type='primary' className="rounded-lg" href="/">Back to Home</Button>
        </div>
    </>
  );
};

export default AuthError;