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
    <Box mt={3}>
      <DropDown
        labelText="categories"
        options={categories}
        value={categorySelect}
        handleChange={setCategorySelect}
      />
      <Table data={products} />
    </Box>
  );
}
