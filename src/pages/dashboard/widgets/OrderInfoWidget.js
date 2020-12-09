import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

import formatCurrency from 'utils/formatCurrency';

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
    fontSize: 35,
  },
}));

function OrderInfoWidget(props) {
  const { data: orderInfo } = props;

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item md={12}>
        <CardOrderWidget
          header="ยอดสั่งซื้อทั้งหมด (บาท)"
          value={orderInfo?.sumTotalPrice}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="จำนวนใบเสร็จทั้งหมด"
          value={orderInfo?.totalTransaction}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="ยอดสั่งซื้อเฉลี่ยต่อใบเสร็จ (บาท)"
          value={orderInfo?.avgTotalPrice}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="ยอดสั่งซื้อขั้นต่ำของใบเสร็จ (บาท)"
          value={orderInfo?.minTotalPrice}
        />
      </Grid>
      <Grid item md={6}>
        <CardOrderWidget
          header="ยอดสั่งซื้อสูงสุดของใบเสร็จ (บาท)"
          value={orderInfo?.maxTotalPrice}
        />
      </Grid>
    </Grid>
  );
}

function CardOrderWidget({ header, value }) {
  const classes = useStyles();
  return (
    <Paper className={classes.mypaper}>
      <Typography variant="body2">{header}</Typography>

      <Typography className={classes.myPaperValue}>
        {formatCurrency(value)}
      </Typography>
    </Paper>
  );
}

export default OrderInfoWidget;
