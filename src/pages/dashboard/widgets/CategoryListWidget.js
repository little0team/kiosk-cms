import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import DoughnutChart from 'components/Charts/doughnut';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
  },
}));

function CategoryListWidget(props) {
  const classes = useStyles();
  const { data } = props;

  const formatChartData = (products = []) => {
    const [labels, data] = seperateData(products);

    return {
      labels,
      datasets: [
        {
          backgroundColor: [
            '#bff0ff',
            '#bfd7ff',
            '#ffbfd9',
            '#ffccbf',
            '#f5ffbf',
          ],
          data,
        },
      ],
    };
  };

  const seperateData = (products) => {
    let labels = [];
    let data = [];
    products.length = 5;

    products.map((product) => {
      labels.push(product.orderProductName);
      return data.push(product.sumOrderProductQTY);
    });

    return [labels, data];
  };

  const categoryListChartData = formatChartData(data);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">สรุปรายการซื้อแยกตามประเภทสินค้า</Typography>

      <DoughnutChart data={categoryListChartData} />
    </Paper>
  );
}

export default CategoryListWidget;
