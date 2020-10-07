const { createSlice } = require('@reduxjs/toolkit');

const alertMessageSlice = createSlice({
  name: 'alertMessage',
  initialState: {
    state: false,
    options: {},
  },
  reducers: {
    openDialog: (state, action) => {
      state.state = true;
      state.options = action.payload;
    },
    closeDialog: (state) => {
      state.state = false;
    },
  },
});

export const { openDialog, closeDialog } = alertMessageSlice.actions;

export default alertMessageSlice.reducer;
