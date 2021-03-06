import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStaffs } from 'features/staff/StaffsSlice';
import { Container, Box, Divider } from '@material-ui/core';
import Table from 'components/TableStaff/Table';
import DropDown from 'components/DropDown';
import ToolBar from './Toolbar';
import { fetchBranchs, selectBranchs } from 'features/branch/branchsSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export default function StaffsPage() {
  const dispatch = useDispatch();
  const branchs = useSelector(selectBranchs);
  const [branchSelect, setBranchSelect] = useState();
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    dispatch(fetchBranchs())
      .then(unwrapResult)
      .then((branchs) => setBranchSelect(branchs[0]?.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStaffs(branchSelect))
      .then(unwrapResult)
      .then((staff) => setStaffs(staff))
      .catch(() => setStaffs([]));
  }, [dispatch, branchSelect, branchs]);

  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>

      <Divider />

      <Box mt={3}>
        <DropDown
          labelText="สาขา"
          options={branchs}
          value={branchSelect}
          handleChange={setBranchSelect}
        />
      </Box>

      <Box mt={3}>
        <Table data={staffs} branchId={branchSelect} />
      </Box>
    </Container>
  );
}
