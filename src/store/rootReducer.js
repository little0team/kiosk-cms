import { combineReducers } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import categoriesSlice from 'features/category/categoriesSlice';
import productsSlice from 'features/product/productsSlice';
import productSlice from 'features/product/productSlice';
import transactionSlice from 'features/transactions/transactionSlice';
import categorySlice from 'features/category/categorySlice';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesSlice,
  category: categorySlice,
  products: productsSlice,
  product: productSlice,
  transaction: transactionSlice,
});

export default rootReducer;
