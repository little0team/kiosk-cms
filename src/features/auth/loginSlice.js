import handlePromise from 'utils/handlePromise';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/authService';

export const login = createAsyncThunk('login/login', async (data) => {
  const [error, loginResponse] = await handlePromise(AuthService.signIn(data));

  if (error) throw new Error(error);

  return loginResponse;
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    success: true,
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.success = true;
    },
    [login.rejected]: (state, action) => {
      state.success = false;
    },
  },
});

export default loginSlice.reducer;
