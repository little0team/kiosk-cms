import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Divider } from '@material-ui/core';
import Table from 'components/TableBranch/Table';
import { fetchBranchs, selectBranchs } from 'features/branch/branchsSlice';
import Toolbar from './Toolbar';

export default function BranchsPage() {
  const dispatch = useDispatch();
  const branchs = useSelector(selectBranchs);

  useEffect(() => {
    dispatch(fetchBranchs());
  }, [dispatch]);
  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <Toolbar />
      </Box>
      <Divider />
      <Box mt={3}>
        <Table data={branchs} />
      </Box>
    </Container>
  );
}
