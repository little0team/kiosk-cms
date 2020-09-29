import React from 'react';
import { Container, Box } from '@material-ui/core';
import Table from 'components/TableStaff/Table';

export default function StaffsPage() {
  const headers = [
    { name: 'id', title: 'Branch Id' },
    { name: 'name', title: 'Branch Name' },
    { name: 'name', title: 'Branch Code' },
  ];

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Table data={[]} />
      </Box>
    </Container>
  );
}
