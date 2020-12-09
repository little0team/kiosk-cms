import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import BarChart from 'components/Charts/bar';

const useStyles = makeStyles(() => ({
  paper: {
    width: 'auto',
    backgroundColor: 'whitesmoke',
    padding: 20,
  },
}));

function AllProductWidget(props) {
  const classes = useStyles();
  const { title, data } = props;

  const formatChartData = (products = []) => {
    const [labels, data] = seperateData(products);

    return {
      labels,
      datasets: [
        {
          label: 'สินค้า',
          backgroundColor: [
            '#bff0ff',
            '#bfd7ff',
            '#ffbfd9',
            '#ffccbf',
            '#f5ffbf',
          ],
          borderWidth: 1,
          data,
        },
      ],
    };
  };

  const seperateData = (products) => {
    let labels = [];
    let data = [];

    products.map((product) => {
      labels.push(product.productName);
      return data.push(product.totalQTY);
    });

    return [labels, data];
  };

  const productChartData = formatChartData(data);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">{title}</Typography>
      <BarChart data={productChartData} />
    </Paper>
  );
}

export default AllProductWidget;
