import React, { useEffect, useState } from 'react';
import Table from 'components/TableTransaction/Table';
import Box from '@material-ui/core/Box';
import { Button, Container } from '@material-ui/core';
import handlePromise from 'utils/handlePromise';
import apiGetTransactions from 'apis/transaction/apiGetTransactions';
import ExcelService from 'services/excelService';
import { convertToExport, headers } from 'services/transactionExcelService';

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async (date = '') => {
    const [error, transactions] = await handlePromise(apiGetTransactions(date));

    if (error) {
      return setTransactions([]);
    }

    return setTransactions(transactions);
  };

  const transactionFilter = (date) => {
    return fetchTransactions(date);
  };

  const exportTransactions = () => {
    const formatDataToExport = convertToExport(transactions);

    ExcelService(headers, formatDataToExport, 'Transaction_Report');
  };

  return (
    <Container maxWidth={false}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={exportTransactions}
        >
          ส่งออกรายการ
        </Button>
      </Box>

      <Box mt={3}>
        <Table data={transactions} filter={transactionFilter} />
      </Box>
    </Container>
  );
}
