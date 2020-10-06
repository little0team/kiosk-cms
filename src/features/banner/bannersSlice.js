import handlePromise from 'utils/handlePromise';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import apiGetBanners from 'apis/banner/apiGetBanners';

export const fetchbanners = createAsyncThunk(
  'banner/fetchbanners',
  async () => {
    const [fetchError, { data }] = await handlePromise(apiGetBanners());

    if (fetchError) throw new Error(fetchError);
    
    return data;
  }
);

const bannersAdapter = createEntityAdapter();

export const { selectAll: selectbanners } = bannersAdapter.getSelectors(
  (state) => state.banners
);

const bannerSlice = createSlice({
  name: 'categories',
  initialState: bannersAdapter.getInitialState(),
  reducers: {
    bannersAdapter
  },
  extraReducers: {
    [fetchbanners.fulfilled]: bannersAdapter.setAll,
  },
});

export default bannerSlice.reducer;
