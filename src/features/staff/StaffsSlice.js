import handlePromise from 'utils/handlePromise';
import apiGetStaffs from 'apis/staff/apiGetStaffs';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const fetchStaffs = createAsyncThunk('staffs/fetchStaffs', async () => {
  const [fetchError, { data }] = await handlePromise(apiGetStaffs());

  if (fetchError) throw new Error(fetchError);

  return data;
});

const staffsAdapter = createEntityAdapter();

export const { selectAll: selectstaffs } = staffsAdapter.getSelectors(
  (state) => {console.log(state); return state.staffs}
);

const staffSlice = createSlice({
  name: 'staffs',
  initialState: staffsAdapter.getInitialState(),
  reducers: {
    staffsAdapter,
  },
  extraReducers: {
    [fetchStaffs.fulfilled]: staffsAdapter.setAll,
  },
});

export default staffSlice.reducer;
