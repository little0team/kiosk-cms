import React from 'react';
import { Container, Box } from '@material-ui/core';
import TableData from 'components/TableData'


export default function BannersPage() {

  const headers = [
    { name: 'id', title: 'Banner Id' },
    { name: 'image', title: 'Image', type: 'image'},
    { name: 'name', title: 'Banner Name' },
  ];

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <TableData header={headers} values={[]}></TableData>
      </Box>
    </Container>
  );
}
