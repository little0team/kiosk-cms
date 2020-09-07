import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: 0,
  reducers: {
    setUser(state) {
      return ++state;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
