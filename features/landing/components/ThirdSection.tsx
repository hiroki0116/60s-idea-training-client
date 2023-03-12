import Image from "next/image";
import MotionDivWhenView from "components/layouts/MotionDivWhenView";
import { THIRD_SECTION } from "utils/constants";
import FieldTimeOutlined from "@ant-design/icons/FieldTimeOutlined";
import ProfileOutlined from "@ant-design/icons/ProfileOutlined";
import ReadOutlined from "@ant-design/icons/ReadOutlined";

const INST_ONE_GIF =
  "https://res.cloudinary.com/sixty-seconds-idea-training-project/image/upload/v1671117710/ApplicationLayout/60s-firstHalf_kun1dn.gif";
const INST_TWO_GIF =
  "https://res.cloudinary.com/sixty-seconds-idea-training-project/image/upload/v1671152053/ApplicationLayout/60slastHalf_h9de4l.gif";

const ThirdSection = () => {
  const items = [
    {
      icon: <FieldTimeOutlined className="text-6xl" />,
      title: "60 seconds only",
      description:
        "You have 60 seconds for each session. You don't have to structure your thoughts! Try to come up with ideas as much as you can in 60 seconds.",
    },
    {
      icon: <ProfileOutlined className="text-6xl" />,
      title: "5 sessions a day",
      description: "Idealy, you come up with 4 or 5 ideas per session.",
      description2: "5 sessions * 60 seconds = 5 mins / Day",
    },
    {
      icon: <ReadOutlined className="text-6xl" />,
      title: "Make a Note",
      description:
        "You can review your sessions and make an organised note for your better ideas.",
    },
  ];

  return (
    <div className="min-h-screen tracking-wider sm:py-20 py-10 sm:max-w-6xl sm:mx-auto px-5 sm:px-5 md:px-5 lg:px-5 xl:px-0">
      <h3 className="sm:text-4xl text-2xl">How it works?</h3>
      <div className="self-center justify-self-center block sm:hidden">
        <Image
          src={THIRD_SECTION}
          alt="Man adding data"
          width={500}
          height={350}
        />
      </div>
      <div className="sm:text-lg text-base font-bold pb-5">
        Simple rules! Brainstorming within 60 seconds! Easy to continue
        everyday!
      </div>
      <div>
        <MotionDivWhenView
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 10 },
          }}
        >
          <div className="grid grid-cols-1 gap-6 pt-5">
            {items.map((item, idx) => (
              <div
                className="flex p-5 gap-8 rounded-lg shadow-lg bg-blue-50 transform transition duration-500 hover:scale-110"
                key={idx}
              >
                {item.icon}
                <div>
                  <p className="text-xl font-bold">{item.title}</p>
                  <p className="sm:text-base text-sm leading-6">
                    {item.description}
                  </p>
                  {item?.description2 ? (
                    <p className="sm:text-base text-sm bg-gray-200 p-1 text-center rounded-lg">
                      {item?.description2}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </MotionDivWhenView>
      </div>
      <h3 className="sm:text-4xl text-2xl pt-10 pb-5">
        How does it look like?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Image
          src={INST_ONE_GIF}
          width={600}
          height={300}
          alt="gif_1"
          className="rounded-lg  shadow-lg overflow-hidden"
        />
        <Image
          src={INST_TWO_GIF}
          width={600}
          height={300}
          alt="gif_2"
          className="rounded-lg shadow-lg overflow-hidden border"
        />
      </div>
    </div>
  );
};

export default ThirdSection;
