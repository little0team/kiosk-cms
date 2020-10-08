import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ data }) {
  return <Doughnut data={data} width={100} height={120} />;
}

export default DoughnutChart;
