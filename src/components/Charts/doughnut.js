import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ data }) {
  return (
    <Doughnut
      data={data}
    //   height={200}
    />
  );
}

export default DoughnutChart;
