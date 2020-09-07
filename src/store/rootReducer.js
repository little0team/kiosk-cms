import { combineReducers } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import categoriesSlice from 'features/category/categoriesSlice';
import productSlice from 'features/product/productsSlice';
import transactionSlice from 'features/transactions/transactionSlice';
import categorySlice from 'features/category/categorySlice';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesSlice,
  category: categorySlice,
  product: productSlice,
  transaction: transactionSlice,
});

export default rootReducer;
