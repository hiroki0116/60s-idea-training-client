import { memo } from "react";
import dynamic from "next/dynamic";
// third parties
import Card from "antd/lib/card";
import ReactApexChart from "react-apexcharts";
import barChart from "../utils/barChartConfig";
// components
const CenterSpin = dynamic(() => import("components/elements/CenterSpin"), {
  ssr: false,
});
import useFetchWeekly from "../hooks/useFetchWeekly";

const BarChart = () => {
  const { weeklyData, loading } = useFetchWeekly();
  return (
    <>
      <Card
        bordered={false}
        style={{ borderRadius: "1rem" }}
        hoverable
        className="shadow-lg dark:bg-slate-800"
        loading={loading}
      >
        <div className="trakcking-wider dark:text-green-400">
          WEEKLY ACHIEVEMENTS
        </div>

        {!weeklyData ? (
          <CenterSpin />
        ) : (
          <ReactApexChart
            className="w-full d"
            options={barChart(weeklyData)}
            series={barChart(weeklyData).series}
            type="bar"
            height={350}
            width={"100%"}
          />
        )}
      </Card>
    </>
  );
};

export default memo(BarChart);
