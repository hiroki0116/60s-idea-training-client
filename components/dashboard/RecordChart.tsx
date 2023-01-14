import ReactApexChart from "react-apexcharts";
import Card from 'antd/es/card'
import barChart from "./config/barChartConfig";
import { IWeeklyData } from "types/Ideas";
import CenterSpin from "components/Layout/CenterSpin";
import { useFetcher } from "customHooks/useFetcher";

const BarChart = () => {
  const {data: data, loading} = useFetcher<IWeeklyData>({url:"/ideas/weekly",initialState:undefined })
  return (
    <>
      <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg dark:bg-slate-800' loading={loading}>
        <div className="trakcking-wider dark:text-green-400">WEEKLY ACHIEVEMENTS</div>

        {!data 
          ? <CenterSpin />
          : <ReactApexChart
              className="w-full d"
              options={barChart(data)}
              series={barChart(data).series}
              type="bar"
              height={350}
              width={"100%"}
            />
        }
      </Card>
    </>
  );
}

export default BarChart;