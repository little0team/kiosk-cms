import React, { useState } from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import useInterval from 'hooks/useInterval';
import handlePromise from 'utils/handlePromise';
import apiGetOrderInfo from 'apis/dashboard/apiGetOrderInfo';

const useStyles = makeStyles(() => ({
  root: {
    padding: 15,
  },
  paper: {
    width: 'auto',
    backgroundColor: 'whitesmoke',
    padding: 10,
  },
  mypaper: {
    padding: 12,
  },
  myPaperValue: {
    padding: 24,
    textAlign: 'center',
    fontSize: 30
  },
}));

function OrderInfoWidget(props) {
  const classes = useStyles();
  const [orderInfo, setOrderInfo] = useState([]);
  
  useInterval(() => {
    const fetchOrderProduct = async () => {
      const [error, orderInfo] = await handlePromise(apiGetOrderInfo());

      if (error) return setOrderInfo([]);

      //   const productChartData = formatChartData(orderProductsData);

      return setOrderInfo(orderInfo);
    };

    fetchOrderProduct();
  }, 3000);

  //   const formatChartData = (products) => {
  //     const [labels, data] = seperateData(products);

  //     return {
  //       labels,
  //       datasets: [
  //         {
  //           label: 'สินค้า',
  //           backgroundColor: [
  //             '#bff0ff',
  //             '#bfd7ff',
  //             '#ffbfd9',
  //             '#ffccbf',
  //             '#f5ffbf',
  //           ],
  //           borderWidth: 1,
  //           data,
  //         },
  //       ],
  //     };
  //   };

  //   const seperateData = (products) => {
  //     let labels = [];
  //     let data = [];

  //     products.map((product) => {
  //       labels.push(product.productName);
  //       return data.push(product.totalQTY);
  //     });

  //     return [labels, data];
  //   };

  return (
    <Grid container className={classes.root} direction="row" spacing={5}>
      <Grid item md={12}>
        <CardOrderWidget
          header="ยอดสั่งซื้อทั้งหมด (บาท)"
          value={orderInfo.sumTotalPrice}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="จำนวนใบเสร็จทั้งหมด"
          value={orderInfo.totalTransaction}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="ยอดสั่งซื้อเฉลี่ยต่อใบเสร็จ (บาท)"
          value={orderInfo.avgTotalPrice}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="ยอดสั่งซื้อขึ้นต่ำของใบเสร็จ (บาท)"
          value={orderInfo.minTotalPrice}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="ยอดสั่งซื้อสูงสุดของใบเสร็จ (บาท)"
          value={orderInfo.maxTotalPrice}
        />
      </Grid>
    </Grid>
  );
}

function CardOrderWidget({ header, value }) {
  const classes = useStyles();
  return (
    <Paper className={classes.mypaper}>
      <Typography variant="h6">{header}</Typography>
      <Typography className={classes.myPaperValue}>{value}</Typography>
    </Paper>
  );
}

export default OrderInfoWidget;
