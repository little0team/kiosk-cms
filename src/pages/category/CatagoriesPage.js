import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCategories,
  fetchCategories,
} from 'features/category/categoriesSlice';
import Table from 'components/TableCategory/Table';
import Box from '@material-ui/core/Box';
import ToolBar from './Toolbar';
import { Container } from '@material-ui/core';
import TableData from 'components/TableData';
/* <Table data={categories} /> */
export default function CategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const headers = [
    { name: 'id', title: 'Category Id' },
    { name: 'image', title: 'Image', type: 'image'},
    { name: 'name', title: 'Category Name' },
  ];

  return (
    <Container maxWidth={false}>
      <ToolBar />
      <Box mt={3}>
        <TableData header={headers} values={categories}></TableData>
      </Box>
    </Container>
  );
}
