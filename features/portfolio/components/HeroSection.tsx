import { PRIMARY_COLOR } from "utils/constants";
import Timeline from "antd/lib/timeline/Timeline";
import Tag from "antd/lib/tag";
import GithubOutlined from "@ant-design/icons/GithubOutlined";
import DownCircleOutlined from "@ant-design/icons/DownCircleOutlined";
import dayjs from "dayjs";

const HeroSection = () => {
  const handleContact = () => {
    const emailSubject: string = "Contact via 60s Idea Training";
    const emailBody: string =
      "Hi, Hiroki.%0D%0A%0D%0AI am reaching out to you regarding...";
    window.open(
      `mailto:hirokiseino0116@gmail.com?subject=${emailSubject}&body=${emailBody}`,
      "_blank"
    );
  };

  const handleScroll = () => {
    const portfolioSection = document.getElementById("portfolios");
    portfolioSection?.scrollIntoView({ behavior: "smooth" });
  };

  const techStacks = [
    "Typescript",
    "React.js",
    "Next.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "REST API",
    "GraphQL",
    "AWS Solutions Architect Associate",
    "Jest",
    "Supertest",
    "Golang",
    "Firebase",
    "ElasticSearch",
  ];

  return (
    <div style={{ backgroundColor: PRIMARY_COLOR }}>
      <div className="min-h-screen grid sm:grid-cols-3 grid-cols-1 justify-items-center items-center sm:max-w-6xl sm:mx-auto px-5 sm:px-5 md:px-5 lg:px-5 xl:px-0">
        <div className="sm:col-span-2">
          <div className="sm:pb-20 pb-5 pt-16">
            <div className="pb-3 text-base text-green-400">Hi, my name is</div>
            <div className="sm:text-6xl text-4xl pb-5 text-zinc-300 flex items-center gap-3">
              <GithubOutlined
                className="cursor-pointer transform transition duration-500 hover:scale-110"
                onClick={() => {
                  window.open("https://github.com/hiroki0116", "_blank");
                }}
              />
              <div>Hiroki Seino.</div>
            </div>
            <div className="sm:text-4xl text-2xl text-zinc-400">
              I build systems with Web Technology.
            </div>
          </div>

          <div className="text-white text-base tracking-wider sm:w-3/5 w-full leading-8 pb-10">
            I&apos;m an enthusiastic junior software developer from Japan. I
            have been currently working for a startup project in
            Sydney/Australia.
            <div className="pt-16">
              {techStacks.map((stack, index) => (
                <Tag
                  key={index}
                  style={{
                    borderRadius: "0.75rem",
                    background: "transparent",
                    borderColor: "green",
                    margin: "0.2rem",
                  }}
                >
                  <span className="text-green-400">{stack}</span>
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:col-span-1 py-10">
          <Timeline>
            <Timeline.Item color="#4ade80">
              <div className="text-zinc-300">
                Develop a job site with MERN stack
              </div>
              <div className="text-zinc-400 text-sm">
                2021 Dec - {dayjs().format("YYYY")} Current
              </div>
            </Timeline.Item>

            <Timeline.Item color="gray">
              <div className="text-zinc-300">
                Master degree in ICT (Web and Mobile Technology) at Western
                Sydney University
              </div>
              <div className="text-zinc-400 text-sm">2020 Feb - 2021 Nov</div>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <div className="text-zinc-300">
                Sales at Amazon Japan Books team
              </div>
              <div className="text-zinc-400 text-sm">2019 Mar - 2019 Dec</div>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <div className="text-zinc-300">
                Retail Management at Nitori Inc.
              </div>
              <div className="text-zinc-400 text-sm">2014 Mar - 2016 Oct</div>
            </Timeline.Item>
            <Timeline.Item color="#67EEF9">
              <div className="text-zinc-300">Bachelor degree in Economics</div>
              <div className="text-zinc-400 text-sm">2010 Apr - 2014 Mar</div>
            </Timeline.Item>
          </Timeline>

          <div>
            <button
              className="border-2 border-green-900  text-green-300 px-5 py-2 rounded transform transition duration-500 hover:scale-110"
              onClick={handleContact}
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="sm:absolute sm:bottom-8 bottom-0 text-center text-white">
          <DownCircleOutlined
            className="text-white text-2xl animate-bounce"
            onClick={handleScroll}
          />
          <div className="pt-1">Scroll down and See my work</div>
        </div>

        <div className="absolute bottom-24  -right-10  text-zinc-400 transform rotate-90 sm:block hidden">
          <p className="text-zinc-400">
            console.log (&quot;Hello World!&quot;);
          </p>
        </div>
        <div className="absolute bottom-0 right-16  text-zinc-400 sm:block hidden">
          <p className="text-zinc-400">{`<60sIdeaTraining />`}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
