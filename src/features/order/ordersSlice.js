import handlePromise from 'utils/handlePromise';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import apiGetOrders from 'apis/order/apiGetOrders';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (dateRange = '') => {
    const [fetchError, { data }] = await handlePromise(apiGetOrders(dateRange));

    if (fetchError) throw new Error(fetchError);

    return data;
  }
);

const ordersAdapter = createEntityAdapter();

export const { selectAll: selectOrders } = ordersAdapter.getSelectors(
  (state) => state.orders
);

const branchSlice = createSlice({
  name: 'orders',
  initialState: ordersAdapter.getInitialState(),
  reducers: {
    ordersAdapter,
  },
  extraReducers: {
    [fetchOrders.fulfilled]: ordersAdapter.setAll,
    [fetchOrders.rejected]: ordersAdapter.removeAll,
  },
});

export default branchSlice.reducer;
