import React from 'react';
import { Container, Box } from '@material-ui/core';
import Table from 'components/TableBranch/Table'
export default function BranchsPage() {

  return (
    <Container maxWidth={false}>
        <Box mt={3}>
        <Table data={[]} />
      </Box>
    </Container>
  );
}
