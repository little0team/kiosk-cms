import handlePromise from 'utils/handlePromise';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import apiGetBranchs from 'apis/branch/apiGetBranchs';

export const fetchBranchs = createAsyncThunk(
  'branch/fetchBranchs',
  async () => {
    const [fetchError, { data }] = await handlePromise(apiGetBranchs());

    if (fetchError) throw new Error(fetchError);
    
    return data;
  }
);

const branchsAdapter = createEntityAdapter();

export const { selectAll: selectBranchs } = branchsAdapter.getSelectors(
  (state) => state.branchs
);

const branchSlice = createSlice({
  name: 'categories',
  initialState: branchsAdapter.getInitialState(),
  reducers: {
    branchsAdapter
  },
  extraReducers: {
    [fetchBranchs.fulfilled]: branchsAdapter.setAll,
  },
});

export default branchSlice.reducer;
