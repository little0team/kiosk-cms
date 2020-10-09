import React, { useEffect, useState } from 'react';
import Table from 'components/TableTransaction/Table';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import handlePromise from 'utils/handlePromise';
import apiGetTransactions from 'apis/transaction/apiGetTransactions';

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const [error, transactions] = await handlePromise(apiGetTransactions());

    if (error) {
      return setTransactions([]);
    }

    return setTransactions(transactions);
  };

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Table data={transactions} />
      </Box>
    </Container>
  );
}
