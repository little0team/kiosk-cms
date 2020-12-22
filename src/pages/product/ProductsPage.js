import React, { useEffect, useState } from 'react';
import Table from 'components/TableProduct/Table';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCategories,
  fetchCategories,
} from 'features/category/categoriesSlice';
import { getProductsByCategoryId } from 'features/product/productsSlice';
import DropDown from 'components/DropDown';
import Box from '@material-ui/core/Box';
import ToolBar from './Toolbar';
import { Divider } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { Container } from '@material-ui/core';
import { chooseCategory } from 'features/product/productSlice';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [categorySelect, setCategorySelect] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories())
      .then(unwrapResult)
      .then((categories) => setCategorySelect(categories[0]?.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCategoryId(categorySelect))
      .then(unwrapResult)
      .then((products) => setProducts(products))
      .catch(() => setProducts([]));
  }, [dispatch, categorySelect, categories]);

  const handleCategoryChange = (categoryId) => {
    setCategorySelect(categoryId);
    dispatch(chooseCategory(categoryId));
  };

  return (
    <Container maxWidth={false}>
      <Box mx={3}>
        <ToolBar />
      </Box>

      <Divider />

      <Box mt={3}>
        <DropDown
          labelText="หมวดหมู่"
          options={categories}
          value={categorySelect}
          handleChange={handleCategoryChange}
        />
      </Box>

      <Box mt={3}>
        <Table data={products} />
      </Box>
    </Container>
  );
}
