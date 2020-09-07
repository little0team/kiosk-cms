import handlePromise from 'utils/handlePromise';
import apiGetCategory from 'apis/category/apiGetCategory';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategory',
  async () => {
    const [fetchError, categories] = await handlePromise(apiGetCategory());

    if (fetchError) throw new Error(fetchError);

    return categories;
  }
);

const categoryAdapter = createEntityAdapter({
  selectId: (category) => category.categoryId,
});

export const { selectAll: selectCategories } = categoryAdapter.getSelectors(
  (state) => state.category
);

const categorySlice = createSlice({
  name: 'category',
  initialState: categoryAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: categoryAdapter.setAll,
  },
});

export default categorySlice.reducer;
