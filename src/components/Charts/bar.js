import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart(props) {
  const { data } = props;

  return (
    <Bar
      data={data}
      width={100}
      height={200}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  );
}

export default BarChart;
