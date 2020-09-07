import handlePromise from 'utils/handlePromise';
import apiPostCategory from 'apis/category/apiPostCategory';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const createCategory = createAsyncThunk(
  'category/CreateCategory',
  async (data) => {
    const [createError, createCategory] = await handlePromise(
      apiPostCategory(data)
    );

    if (createError) throw new Error(createError);

    return createCategory;
  }
);

const categoryAdapter = createEntityAdapter({});

const categorySlice = createSlice({
  name: 'category',
  initialState: categoryAdapter.getInitialState(),
  extraReducers: {
    [createCategory.fulfilled]: (state, action) => action.payload,
  },
});

export default categorySlice.reducer;
