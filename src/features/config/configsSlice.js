import handlePromise from 'utils/handlePromise';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import apiGetConfigs from 'apis/config/apiGetConfigs';

export const fetchconfigs = createAsyncThunk(
  'config/fetchconfigs',
  async () => {
    const [fetchError, { data }] = await handlePromise(apiGetConfigs());

    if (fetchError) throw new Error(fetchError);
    
    return data;
  }
);

const configsAdapter = createEntityAdapter();

export const { selectAll: selectconfigs } = configsAdapter.getSelectors(
  (state) => state.configs
);

const configSlice = createSlice({
  name: 'categories',
  initialState: configsAdapter.getInitialState(),
  reducers: {
    configsAdapter
  },
  extraReducers: {
    [fetchconfigs.fulfilled]: configsAdapter.setAll,
  },
});

export default configSlice.reducer;
