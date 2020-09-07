import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrders,
  selectTransactions,
} from 'features/transactions/transactionSlice';
import Table from 'components/TableOrders/Table';
import Box from '@material-ui/core/Box';

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Box mt={3}>
      <Table data={orders} />
    </Box>
  );
}
