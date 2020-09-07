import handlePromise from 'utils/handlePromise';
import apiGetProducts from 'apis/product/apiGetProducts';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const getProductsByCategoryId = createAsyncThunk(
  'product/getProductsByCategoryId',
  async (categoryId) => {
    const [error, products] = await handlePromise(apiGetProducts(categoryId));

    if (error) throw new Error(error);
    
    return products;
  }
);

const productAdapter = createEntityAdapter({
  selectId: (product) => product.productId,
});

export const { selectAll: selectProducts } = productAdapter.getSelectors(
  (state) => state.product
);

const productSlice = createSlice({
  name: 'product',
  initialState: productAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getProductsByCategoryId.fulfilled]: productAdapter.setAll,
  },
});

export default productSlice.reducer;
