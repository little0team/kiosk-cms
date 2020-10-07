import React, { useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import BarChart from 'components/Charts/bar';
import useInterval from 'hooks/useInterval';
import handlePromise from 'utils/handlePromise';
import apiGetBestProductSeller from 'apis/dashboard/apiGetBestProductSeller';

const useStyles = makeStyles(() => ({
  paper: {
    width: 'auto',
    backgroundColor: 'whitesmoke',
    padding: 10,
  },
}));

function AllProductWidget(props) {
  const classes = useStyles();
  const [orderProduct, setOrderProduct] = useState([]);
  const { title } = props;

  useInterval(() => {
    const fetchOrderProduct = async () => {
      const [error, orderProductsData] = await handlePromise(
        apiGetBestProductSeller()
      );

      if (error) return setOrderProduct([]);

      const productChartData = formatChartData(orderProductsData);

      return setOrderProduct(productChartData);
    };

    fetchOrderProduct();
  }, 2000);

  const formatChartData = (products) => {
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

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">{title}</Typography>
      <BarChart data={orderProduct} />
    </Paper>
  );
}

export default AllProductWidget;
