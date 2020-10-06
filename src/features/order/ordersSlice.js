import handlePromise from 'utils/handlePromise';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import apiGetOrders from 'apis/order/apiGetOrders';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const [fetchError, { data }] = await handlePromise(apiGetOrders());

  if (fetchError) throw new Error(fetchError);
  return data;
});

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
  },
});

export default branchSlice.reducer;
