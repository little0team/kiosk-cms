import React, { useEffect, useState } from 'react';
import Table from 'components/TableProduct/Table';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCategories,
  fetchCategories,
} from 'features/category/categoriesSlice';
import {
  getProductsByCategoryId,
  selectProducts,
} from 'features/product/productsSlice';
import DropDown from 'components/DropDown';
import Box from '@material-ui/core/Box';
import ToolBar from './Toolbar';
import { Divider } from '@material-ui/core';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [categorySelect, setCategorySelect] = useState(1);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId(categorySelect));
  }, [dispatch, categorySelect]);

  return (
    <>
      <Box mx={3}>
        <ToolBar />
      </Box>
      <Divider />
      <Box mt={3}>
        <DropDown
          labelText="categories"
          options={categories}
          value={categorySelect}
          handleChange={setCategorySelect}
        />
      </Box>
      <Box mt={3}>
        <Table data={products} />
      </Box>
    </>
  );
}
