import React from 'react';
import { Container, Box } from '@material-ui/core';
import Table from 'components/TableBanner/Table'

export default function BannersPage() {

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <Table data={[]}/>
      </Box>
    </Container>
  );
}
 