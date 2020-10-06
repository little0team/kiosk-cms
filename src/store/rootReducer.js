import { combineReducers } from '@reduxjs/toolkit';
import loginSlice from 'features/auth/loginSlice';
import userSlice from 'features/auth/userSlice';
import categoriesSlice from 'features/category/categoriesSlice';
import productsSlice from 'features/product/productsSlice';
import productSlice from 'features/product/productSlice';
import categorySlice from 'features/category/categorySlice';
import branchsSlice from 'features/branch/branchsSlice';
import staffsSlice from 'features/staff/StaffsSlice';
import ordersSlice from 'features/order/ordersSlice';
import bannersSlice from 'features/banner/bannersSlice';
import configsSlice from 'features/config/configsSlice';

const rootReducer = combineReducers({
  login: loginSlice,
  user: userSlice,
  branchs: branchsSlice,
  categories: categoriesSlice,
  category: categorySlice,
  products: productsSlice,
  product: productSlice,
  staffs: staffsSlice,
  orders: ordersSlice,
  banners: bannersSlice,
  configs: configsSlice,
});

export default rootReducer;
