import React from 'react';
import { Container, Box } from '@material-ui/core';
import TableData from 'components/TableData';

export default function StaffsPage() {
  const headers = [
    { name: 'id', title: 'Branch Id' },
    { name: 'name', title: 'Branch Name' },
    { name: 'name', title: 'Branch Code' },
  ];

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <TableData header={headers} values={[]}></TableData>
      </Box>
    </Container>
  );
}
