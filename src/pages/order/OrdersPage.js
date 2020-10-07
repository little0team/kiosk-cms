import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrders,
  fetchOrders,
} from 'features/order/ordersSlice';
import Table from 'components/TableOrders/Table';
import Box from '@material-ui/core/Box';
import ToolBar from './Toolbar';
import { Container, Divider } from '@material-ui/core';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>
      <Divider />
      <Box mt={3}>
        <Table data={orders} />
      </Box>
    </Container>
  );
}