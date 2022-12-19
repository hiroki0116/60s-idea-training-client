import Image from "next/image";
import Link from "next/link";
import Tag from "antd/lib/tag";
import ToolOutlined from "@ant-design/icons/lib/icons/ToolOutlined";
import {
  tagsFirstClient,
  tagsFirstServer,
  tagsSecondClient,
  tagsSecondServer,
} from "utils/constants";

type Portfolio = {
  title: string;
  description: string;
  src1: string;
  src2: string;
  url: string;
  clientTags: string[];
  serverTags: string[];
};

const PortfolioSection = () => {
  const contents: Portfolio[] = [
    {
      title: "60s Idea Training",
      description:
        "60seconds Idea Training App helps your brainstorming exercise in a limited time like pomodoro clock.\
      It is a method that enhances the ability to make quick decisions and increases the \
      quality and speed of thinking. Decide on a topic first, which can be your concerns, \
      doubts, what you learned, challenges and so on. Then, try to come up with 4~5 small \
      ideas as soon as an idea comes to your mind within 60 seconds. These ideas can be reviewed \
      afterwards and brushed up by creating your own note on your dashboard.",
      url: "https://60s-idea-training.vercel.app",
      src1: "https://res.cloudinary.com/sixty-seconds-idea-training-project/image/upload/v1671117710/ApplicationLayout/60s-firstHalf_kun1dn.gif",
      src2: "https://res.cloudinary.com/sixty-seconds-idea-training-project/image/upload/v1671152053/ApplicationLayout/60slastHalf_h9de4l.gif",
      clientTags: tagsFirstClient,
      serverTags: tagsFirstServer,
    },
    {
      title: "Task GO",
      description:
        "This is super simple task manager app. You can keep track of your daily tasks easily.\
      This was developed to learn Golang with Gin framework. \nThe application will cold start for the first request on Cloud Run.",
      url: "https://go-next-tasks.vercel.app",
      src1: "https://res.cloudinary.com/sixty-seconds-idea-training-project/image/upload/v1671121225/ApplicationLayout/firstHalfTask_eizrqv.gif",
      src2: "https://res.cloudinary.com/sixty-seconds-idea-training-project/image/upload/v1671123366/ApplicationLayout/taskLastHafl_cm5naw.gif",
      clientTags: tagsSecondClient,
      serverTags: tagsSecondServer,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 justify-items-center items-center sm:px-36 px-10 bg-slate-100">
      <h1
        id="portfolios"
        className="text-xl pt-16 pb-8 font-extrabold"
      >
        Check on My Work
      </h1>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mb-10">
        {contents.map((item, index) => (
          <div className="flex flex-col w-full" key={index}>
            <div className="text-left bg-blue-100 rounded-lg shadow-lg px-8 py-3">
              <Link href={item.url}>
                <a
                  target="_blank"
                  className="text-orange-500 text-16 font-bold cursor-pointer transform transition duration-500 hover:scale-110 underline underline-offset-4"
                >
                  {item.title}
                </a>
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 my-5">
                <Image
                  src={item.src1}
                  width={500}
                  height={300}
                  alt={item.title}
                />
                <Image
                  src={item.src2}
                  width={500}
                  height={300}
                  alt={item.title}
                />
              </div>
              <div className="mt-2 text-gray-700">{item.description}</div>
              <div className="py-3 underline underline-offset-4">
                <ToolOutlined /> Tech Stack
              </div>
              <div className="flex flex-wrap rounded-lg gap-1">
                <span>Frontend: </span>
                {item.clientTags.map((tag, i) => (
                  <Tag key={i} color="geekblue">
                    {tag}
                  </Tag>
                ))}
                <span>Backend: </span>
                {item.serverTags.map((tag, i) => (
                  <Tag key={i} color="volcano">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
