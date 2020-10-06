import handlePromise from 'utils/handlePromise';
import apiGetStaffsByBranchId from 'apis/staff/apiGetStaffsByBranchId';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const fetchStaffs = createAsyncThunk(
  'staffs/fetchStaffs',
  async (branchId) => {
    const [fetchError, { data }] = await handlePromise(
      apiGetStaffsByBranchId(branchId)
    );

    if (fetchError) throw new Error(fetchError);

    return data;
  }
);

const staffsAdapter = createEntityAdapter();

export const { selectAll: selectStaffs } = staffsAdapter.getSelectors(
  (state) => {
    console.log(state);
    return state.staffs;
  }
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
