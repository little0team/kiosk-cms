import React from 'react';
import { Container, Box, Divider } from '@material-ui/core';
import Table from 'components/TableBanner/Table';
import ToolBar from './Toolbar';
export default function BannersPage() {
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
