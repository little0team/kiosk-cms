import handlePromise from 'utils/handlePromise';
import apiGetProducts from 'apis/product/apiGetProducts';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const getProductsByCategoryId = createAsyncThunk(
  'products/getProductsByCategoryId',
  async (categoryId) => {
    const [error, { data }] = await handlePromise(apiGetProducts(categoryId));

    if (error) throw new Error(error);
    
    return data;
  }
);

const productsAdapter = createEntityAdapter({
  selectId: (products) => products.productId,
});

export const { selectAll: selectProducts } = productsAdapter.getSelectors(
  (state) => state.products
);

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getProductsByCategoryId.fulfilled]: productsAdapter.setAll,
  },
});

export default productsSlice.reducer;
