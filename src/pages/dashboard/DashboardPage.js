import React from 'react';
import { Container, Grid } from '@material-ui/core';
import AllProductWidget from './widgets/AllProductWidget';
import OrderInfoWidget from './widgets/OrderInfoWidget'
import CategoryListWidget from './widgets/CategoryListWidget'

export default function DashboardPage() {
  return (
    <Container maxWidth={false}>
      <Grid container direction="row" spacing={5}>
        <Grid item md={12}>
          <AllProductWidget title="อันดับรายการสินค้าที่มีการซื้อสูงสุด 5 อันดับ" />
        </Grid>
        <Grid item md={6}>
          <OrderInfoWidget title="อันดับรายการสินค้าที่มีการซื้อสูงสุด 5 อันดับ" />
        </Grid>
        <Grid item md={6}>
          <CategoryListWidget title="test"/>
        </Grid>
      </Grid>
    </Container>
  );
}
