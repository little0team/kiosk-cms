import React from 'react';
import { Container, Box, Divider } from '@material-ui/core';
import Table from 'components/TableStaff/Table';
import ToolBar from './Toolbar';

export default function StaffsPage() {
  
  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>
      <Divider />
      <Box mt={3}>
        <Table data={[]} />
      </Box>
    </Container>
  );
}
