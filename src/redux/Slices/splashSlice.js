import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const splashSlice = createSlice({
  name: 'splash',
  initialState,
  reducers: {
    userSave: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {userSave} = splashSlice.actions;

export default splashSlice.reducer;
