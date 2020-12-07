import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, fetchOrders } from 'features/order/ordersSlice';
import Table from 'components/TableOrders/Table';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { convertToExport, headers } from 'services/orderExcelService';
import ExcelService from 'services/excelService';

export default function OrderPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const exportTransactions = () => {
    const formatDataToExport = convertToExport(orders);

    ExcelService(headers, formatDataToExport, 'Orders_Report');
  };

  const orderFilter = (date) => {
    return dispatch(fetchOrders(date));
  };

  return (
    <Container maxWidth={false}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={exportTransactions}
        >
          ส่งออกรายการคำสั่งซื้อ
        </Button>
      </Box>

      <Box mt={3}>
        <Table data={orders} filter={orderFilter} />
      </Box>
    </Container>
  );
}
