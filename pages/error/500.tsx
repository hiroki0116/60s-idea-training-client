import React from "react";
import Result from "antd/lib/result";
import Button from "antd/lib/button";

const ServerError = () => {
  return (
    <>
      <Result
        title={
          <span className="bg-slate-900/text-primary rounded font-extrabold tracking-normal">
            We are having a server error
          </span>
        }
        status="500"
      />
      <div className="flex justify-center">
        <Button type="primary" className="rounded-lg" href="/">
          Back to Home
        </Button>
      </div>
    </>
  );
};

export default ServerError;
