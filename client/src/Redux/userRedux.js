import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;

      localStorage.setItem('user', JSON.stringify(action.payload))
      state.currentUser = action.payload 
    },

    loginFailure: (state, action) => {
      state.isFetching=false;
      state.error=action.payload;
    },

    logout: (state) => {
      localStorage.clear()
      state.currentUser = null;
    }
  }
})

export const { loginStart, loginFailure, loginSuccess, logout } = UserSlice.actions;
export default UserSlice.reducer;