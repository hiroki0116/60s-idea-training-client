// third parties
import Card from "antd/lib/card";
import ReactApexChart from "react-apexcharts";
import barChart from "../utils/barChartConfig";
// components
import CenterSpin from "components/elements/CenterSpin";
// utils
import { useFetcher } from "customHooks/useFetcher";
import { IWeeklyData } from "types/Ideas";

const BarChart = () => {
  const { data: data, loading } = useFetcher<IWeeklyData>({
    url: "/ideas/weekly",
    initialState: undefined,
  });
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

        {!data ? (
          <CenterSpin />
        ) : (
          <ReactApexChart
            className="w-full d"
            options={barChart(data)}
            series={barChart(data).series}
            type="bar"
            height={350}
            width={"100%"}
          />
        )}
      </Card>
    </>
  );
};

export default BarChart;
