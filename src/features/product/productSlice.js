const { createSlice } = require('@reduxjs/toolkit');

const productSlice = createSlice({
  name: 'product',
  initialState: {
    categorySelected: '',
  },
  reducers: {
    chooseCategory: (state, action) => {
      return {
        ...state,
        categorySelected: action.payload,
      };
    },
  },
});

export const { chooseCategory } = productSlice.actions;

export default productSlice.reducer;
