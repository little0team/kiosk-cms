import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const categoryAdapter = createEntityAdapter({});

const categorySlice = createSlice({
  name: 'category',
  initialState: categoryAdapter.getInitialState(),
});

export default categorySlice.reducer;
