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
    const [fetchError, { data }] = await handlePromise(apiGetCategory());

    if (fetchError) throw new Error(fetchError);
    
    return data;
  }
);

const categoriesAdapter = createEntityAdapter();

export const { selectAll: selectCategories } = categoriesAdapter.getSelectors(
  (state) => state.categories
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState(),
  reducers: {
    categoriesAdapter
  },
  extraReducers: {
    [fetchCategories.fulfilled]: categoriesAdapter.setAll,
  },
});

export default categorySlice.reducer;
