// third parties
import Card from "antd/lib/card";
import Statistic from "antd/lib/statistic";
import { motion } from "framer-motion";
import AimOutlined from "@ant-design/icons/AimOutlined";
import LineChartOutlined from "@ant-design/icons/LineChartOutlined";
import BulbOutlined from "@ant-design/icons/BulbOutlined";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import CountUp from "react-countup";
// utils
import { fadeInRight } from "utils/animations";
import { PRIMARY_COLOR } from "utils/constants";
// services
import useFetchTotalSessions from "../hooks/useFetchTotalSessions";
import useFetchToday from "../hooks/useFetchToday";
import useFetchConsecutive from "../hooks/useFetchConsecutive";
const { Meta } = Card;
const formatter = (value: number) => (
  <CountUp
    end={value}
    separator=","
    className="sm:text-2xl text-lg font-bold text-gray-800 dark:text-green-400"
  />
);

const HeadCards = () => {
  const { totalIdeasSessions, loadingForTotal } = useFetchTotalSessions();
  const { todayIdeas, todaySessions, loadingForToday } = useFetchToday();
  const { consecutiveDays, loadingForConsecutiveDays } = useFetchConsecutive();

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInRight}
        className="grid md:grid-cols-4 grid-cols-2 w-full md:h-28 h-52 gap-5 mb-20 md:mb-10"
      >
        <Card
          bordered={false}
          style={{ borderRadius: "1rem" }}
          hoverable
          className="shadow-lg  dark:bg-slate-800 cursor-default"
          loading={loadingForToday}
        >
          <Meta
            description={
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col w-full">
                  <div className="text-gray-500">
                    <span className="bg-blue-50 sm:px-2 py-0.5 rounded tracking-wider dark:text-green-500 dark:bg-slate-900">
                      TODAY
                    </span>
                  </div>
                  <div className="flex flex-row w-full gap-4 justify-evenly pt-1">
                    <div className="flex flex-col text-center">
                      <Statistic
                        value={todaySessions || 0}
                        formatter={formatter}
                      />
                      <span className="text-sm text-gray-400">Sessions</span>
                    </div>
                    <div className="border-l-[1.5px] text-gray-400" />
                    <div className="flex flex-col text-center">
                      <div className="sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400">
                        <Statistic
                          value={todayIdeas || 0}
                          formatter={formatter}
                        />
                      </div>
                      <span className="text-sm text-gray-400">Ideas</span>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:block hidden rounded-lg text-white dark:text-green-400"
                  style={{ background: PRIMARY_COLOR }}
                >
                  <AimOutlined className="text-2xl p-3" />
                </div>
              </div>
            }
          />
        </Card>
        <Card
          bordered={false}
          style={{ borderRadius: "1rem" }}
          hoverable
          className="shadow-lg  dark:bg-slate-800 cursor-default"
          loading={loadingForTotal}
        >
          <Meta
            description={
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col w-full">
                  <div className="text-gray-500">
                    <span className="bg-blue-50 px-2 py-0.5 rounded tracking-wider dark:bg-slate-900 dark:text-green-500">
                      TOTAL
                    </span>
                  </div>
                  <div className="flex flex-col text-center pt-1">
                    <div className="sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400">
                      <Statistic
                        value={totalIdeasSessions?.totalSessions || 0}
                        formatter={formatter}
                      />
                    </div>
                    <span className="text-sm text-gray-400">Sessions</span>
                  </div>
                </div>
                <div
                  className="sm:block hidden rounded-lg text-white dark:text-green-400"
                  style={{ background: PRIMARY_COLOR }}
                >
                  <LineChartOutlined className="text-2xl p-3" />
                </div>
              </div>
            }
          />
        </Card>
        <Card
          bordered={false}
          style={{ borderRadius: "1rem" }}
          hoverable
          className="shadow-lg dark:bg-slate-800 cursor-default"
          loading={loadingForTotal}
        >
          <Meta
            description={
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col w-full">
                  <div className="text-gray-500">
                    <span className="bg-blue-50 px-2 py-0.5 rounded tracking-wider dark:bg-slate-900 dark:text-green-500">
                      TOTAL
                    </span>
                  </div>
                  <div className="flex flex-col text-center pt-1">
                    <div className="sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400">
                      <Statistic
                        value={totalIdeasSessions?.totalIdeas || 0}
                        formatter={formatter}
                      />
                    </div>
                    <span className="text-sm text-gray-400">Ideas</span>
                  </div>
                </div>
                <div
                  className="sm:block hidden rounded-lg text-white dark:text-green-400"
                  style={{ background: PRIMARY_COLOR }}
                >
                  <BulbOutlined className="text-2xl p-3" />
                </div>
              </div>
            }
          />
        </Card>
        <Card
          bordered={false}
          style={{ borderRadius: "1rem" }}
          hoverable
          className="shadow-lg dark:bg-slate-800 cursor-default"
          loading={loadingForConsecutiveDays}
        >
          <Meta
            description={
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col w-full">
                  <div className="text-gray-500">
                    <span className="bg-blue-50 px-2 py-0.5 rounded tracking-wider dark:bg-slate-900 dark:text-green-500">
                      CONSECUTIVE
                    </span>
                  </div>
                  <div className="flex flex-col text-center pt-1">
                    <div className="sm:text-3xl text-lg font-bold text-gray-800 dark:text-green-400">
                      <Statistic
                        value={consecutiveDays || 0}
                        formatter={formatter}
                      />
                    </div>
                    <span className="text-sm text-gray-400">Days</span>
                  </div>
                </div>
                <div
                  className="sm:block hidden rounded-lg text-white dark:text-green-400"
                  style={{ background: PRIMARY_COLOR }}
                >
                  <CalendarOutlined className="text-2xl p-3" />
                </div>
              </div>
            }
          />
        </Card>
      </motion.div>
    </>
  );
};

export default HeadCards;
