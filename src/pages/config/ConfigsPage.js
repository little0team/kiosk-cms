import React from 'react';
import { Container, Box } from '@material-ui/core';
import Table from 'components/TableConfig/Table'
export default function ConfigsPage() {

  return (
    <Container maxWidth={false}>
        <Box mt={3}>
        <Table data={[]} />
      </Box>
    </Container>
  );
}
