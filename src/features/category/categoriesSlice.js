import handlePromise from 'utils/handlePromise';
import apiGetCategory from 'apis/category/apiGetCategory';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const [fetchError, categories] = await handlePromise(apiGetCategory());

    if (fetchError) throw new Error(fetchError);

    return categories;
  }
);

const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category.categoryId,
});

export const { selectAll: selectCategories } = categoriesAdapter.getSelectors(
  (state) => state.categories
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: categoriesAdapter.setAll,
  },
});

export default categorySlice.reducer;
