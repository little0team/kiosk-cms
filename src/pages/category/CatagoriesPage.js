import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCategories,
  fetchCategories,
} from 'features/category/categoriesSlice';
import Table from 'components/TableCategory/Table';
import Box from '@material-ui/core/Box';
import ToolBar from './Toolbar';
import { Container, Divider } from '@material-ui/core';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>
      <Divider />
      <Box mt={3}>
        <Table data={categories} />
      </Box>
    </Container>
  );
}
