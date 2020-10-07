const { createSlice, createEntityAdapter } = require('@reduxjs/toolkit');

const productAdapter = createEntityAdapter({});

const productSlice = createSlice({
  name: 'product',
  initialState: productAdapter.getInitialState(),
});

export default productSlice.reducer;
