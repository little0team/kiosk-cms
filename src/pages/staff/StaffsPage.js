import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectstaffs, fetchStaffs } from 'features/staff/StaffsSlice';
import { Container, Box, Divider } from '@material-ui/core';
import Table from 'components/TableStaff/Table';
import ToolBar from './Toolbar';

export default function StaffsPage() {
  const dispatch = useDispatch();
  const staffs = useSelector(selectstaffs);

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);

  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>
      <Divider />
      <Box mt={3}>
        <Table data={[staffs]} />
      </Box>
    </Container>
  );
}
