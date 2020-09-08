import handlePromise from 'utils/handlePromise';
import apiPostProduct from 'apis/product/apiPostProduct';

const {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} = require('@reduxjs/toolkit');

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data) => {
    const categoryId = data.get('categoryId');

    const [error, createProduct] = await handlePromise(
      apiPostProduct(categoryId, data)
    );

    if (error) throw new Error(error);

    return createProduct;
  }
);

const productAdapter = createEntityAdapter({});

const productSlice = createSlice({
  name: 'product',
  initialState: productAdapter.getInitialState(),
  extraReducers: {
    [createProduct.fulfilled]: (state, action) => action.payload,
  },
});

export default productSlice.reducer;
