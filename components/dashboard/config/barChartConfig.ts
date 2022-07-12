import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import _ from 'lodash';
import { IWeeklyIdeasSessions } from "types/Ideas";


const barChart = (
  { 
    weeklyRecords,
    lastMonday 
  } : {
    weeklyRecords:IWeeklyIdeasSessions[],
    lastMonday: Date
  }) => {

  let weeklyDates:string[] = [];
  let sessionsData:number[] = [];
  let ideasData:number[] = [];

  for(let i = 0; i < 7; i++){
    weeklyDates.push(dayjs(lastMonday).add(i,'days').format('YYYY-MM-DD'));
  }

  weeklyDates.forEach((day) => {
    if (weeklyRecords?.some((record) => record._id === day)) {
      ideasData.push(_.find(weeklyRecords, { _id: day }).totalIdeas);
      sessionsData.push(_.find(weeklyRecords, { _id: day }).totalSessions);
    } else {
      ideasData.push(0);
      sessionsData.push(0);
    }
  });

    
  const options:ApexOptions = { 
    series: [{
      name: 'Sessions',
      data: sessionsData
    }, {
      name: 'Ideas',
      data: ideasData
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
      categories: weeklyDates,
      labels: {
        formatter: function(val) {
          return dayjs(val).format('ddd DD MMM')
        },
        style:{
          fontSize:'13px',
          fontWeight:700,
        }
      }
    },

    fill: {
      opacity: 1
    },

    legend: {
      position: 'top',
      offsetY: 20
    },
    yaxis: [
      {
        labels: {
          formatter: function(val) {
            return val.toFixed(0);
          }
        }
      }
    ]
  }


  return options;
}

export default barChart;