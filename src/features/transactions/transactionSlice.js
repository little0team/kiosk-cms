import handlePromise from 'utils/handlePromise';
import apiGetOrders from 'apis/order/apiGetOrders';

const {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} = require('@reduxjs/toolkit');

export const getOrders = createAsyncThunk('transaction/getOrders', async () => {
  const [error, orders] = await handlePromise(apiGetOrders());

  if (error) throw new Error(error);

  return orders;
});

const orderAdapter = createEntityAdapter({
  selectId: (transactions) => transactions.orderId,
});

export const { selectAll: selectTransactions } = orderAdapter.getSelectors(
  (state) => state.transaction
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: orderAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getOrders.fulfilled]: orderAdapter.setAll,
  },
});

export default transactionSlice.reducer;
