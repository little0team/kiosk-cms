import { combineReducers } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import categorySlice from 'features/category/categoriesSlice';
import productSlice from 'features/product/productsSlice';
import transactionSlice from 'features/transactions/transactionSlice';

const rootReducer = combineReducers({
  user: userReducer,
  category: categorySlice,
  product: productSlice,
  transaction: transactionSlice,
});

export default rootReducer;
