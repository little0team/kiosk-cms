import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCategories,
  fetchCategories,
} from 'features/category/categoriesSlice';
import Table from 'components/TableCategory/Table';
import Box from '@material-ui/core/Box';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box mt={3}>
      <Table data={categories} />
    </Box>
  );
}
