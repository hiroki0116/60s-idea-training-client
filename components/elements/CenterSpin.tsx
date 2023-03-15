import Spin from "antd/lib/spin";

const CenterSpin = ({
  size = "default",
}: {
  size?: "default" | "small" | "large" | undefined;
}) => {
  return (
    <div className="flex justify-center items-center">
      <Spin size={size} />
    </div>
  );
};

export default CenterSpin;
