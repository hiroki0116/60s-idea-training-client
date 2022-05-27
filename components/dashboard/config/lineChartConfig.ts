import { ApexOptions } from "apexcharts";
import { PRIMARY_COLOR } from "utils/constants";

const barChart: ApexOptions = {
    series: [{
      name: 'Sessions',
      data: [5, 9, 6, 8, 10, 4, 7]
    }, {
      name: 'Ideas',
      data: [20, 45, 30, 40, 24, 30, 22]
    }],
          
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show:true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 5
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      offsetY: 20
    },
}

export default barChart;