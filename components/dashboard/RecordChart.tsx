import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Card from 'antd/es/card'
import barChart from "./config/barChartConfig";
import { IWeeklyData } from "types/Ideas";
import { APIWithoutAuth } from "utils/api";
import {getWeeklyRecords} from 'services/dashboard'
import CenterSpin from "components/Layout/CenterSpin";

const BarChart = () => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ weeklyData, setWeeklyData ] = useState<IWeeklyData|undefined>(undefined);

  useEffect(()=> {
    getWeeklyData();
  },[])
  
  const getWeeklyData = async() => {
    setLoading(true);
    try {
      const result = await getWeeklyRecords();
      setWeeklyData(result);
    } catch (error:any) {
      await APIWithoutAuth.post('/error-message', {error: error.message});
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg dark:bg-slate-800' loading={loading}>
        <div className="trakcking-wider dark:text-green-400">WEEKLY ACHIEVEMENTS</div>

        {!weeklyData 
          ? <CenterSpin />
          : <ReactApexChart
              className="w-full d"
              options={barChart(weeklyData)}
              series={barChart(weeklyData).series}
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