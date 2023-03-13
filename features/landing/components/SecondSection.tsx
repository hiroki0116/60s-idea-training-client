import MotionDivWhenView from "components/layouts/MotionDivWhenView";
import { PRIMARY_COLOR } from "utils/constants";
// third party
import LineChartOutlined from "@ant-design/icons/LineChartOutlined";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import HighlightOutlined from "@ant-design/icons/HighlightOutlined";
// types
import { Content } from "features/landing/types/Content";

const SecondSection = () => {
  const contents: Content[] = [
    {
      title: "Better thinking availability",
      body: "Outputting has the effect of increasing the capacity of the brain and increasing the speed of information processing.",
      icon: <LineChartOutlined className="text-4xl pb-5" />,
    },
    {
      title: "Better Mental Health",
      body: "Psychological stress can be reduced by knowing your stress, worries, and fears and facing the problems.",
      icon: <HeartOutlined className="text-4xl pb-5" />,
    },
    {
      title: "Better Learning Practice",
      body: "Familiar with the forgetting curve theory? 70% of what you learn today will be lost tomorrow without reviewing.",
      icon: <HighlightOutlined className="text-4xl pb-5" />,
    },
  ];

  return (
    <div style={{ backgroundColor: PRIMARY_COLOR }}>
      <div className="min-h-screen grid grid-cols-1 py-10 justify-items-center content-center text-white gap-10 tracking-wider sm:max-w-6xl sm:mx-auto px-5 sm:px-5 md:px-5 lg:px-5 xl:px-0">
        <h3 className="sm:text-4xl text-2xl text-white text-center">
          Why do you want to <br />
          train output skill ?
        </h3>
        <MotionDivWhenView
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 10 },
          }}
        >
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-10 w-full px-10">
            {contents.map((content, index) => (
              <div
                className="col-span-1 rounded-lg border border-white p-5 transform transition duration-500 hover:scale-110"
                key={index}
              >
                {content.icon}
                <h4 className="text-lg text-green-400 font-bold tracking-wider pb-5">
                  {content.title}
                </h4>
                <p className="border-l-2 pl-2 text-base sm:leading-7 leading-5">
                  {content.body}
                </p>
              </div>
            ))}
          </div>
        </MotionDivWhenView>
      </div>
    </div>
  );
};

export default SecondSection;
