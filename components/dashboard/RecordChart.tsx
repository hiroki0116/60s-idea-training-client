import ReactApexChart from "react-apexcharts";
import { Typography,Card } from "antd";
import barChart from "./config/lineChartConfig";

const LineChart = () => {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <Card bordered={false} style={{borderRadius:'1rem'}} hoverable className='shadow-lg'>
        <div>
          <Title level={5}>Weekly Achievements</Title>
        </div>

        <ReactApexChart
          className="full-width"
          options={barChart}
          series={barChart.series}
          type="bar"
          height={350}
          width={"100%"}
        />
      </Card>
    </>
  );
}

export default LineChart;