import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from 'features/auth/loginSlice';
import userSlice from 'features/auth/userSlice';
import categoriesSlice from 'features/category/categoriesSlice';
import productsSlice from 'features/product/productsSlice';
import productSlice from 'features/product/productSlice';
import transactionSlice from 'features/transactions/transactionSlice';
import categorySlice from 'features/category/categorySlice';
import branchsSlice from 'features/branch/branchsSlice';

const rootReducer = combineReducers({
  login: loginSlice,
  user: userSlice,
  branchs: branchsSlice,
  categories: categoriesSlice,
  category: categorySlice,
  products: productsSlice,
  product: productSlice,
  transaction: transactionSlice,
});

export default rootReducer;
