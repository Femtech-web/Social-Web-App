import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    errorMsg: "",
    successMsg: "",
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action = {}) => {
      state.isFetching = false;

      localStorage.setItem("bible-user", JSON.stringify(action.payload));
      state.currentUser = action.payload;
    },

    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    logout: (state) => {
      localStorage.clear();
      state.currentUser = null;
    },

    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },

    setSuccessMsg: (state, action) => {
      state.successMsg = action.payload;
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  setErrorMsg,
  setSuccessMsg,
} = UserSlice.actions;
export default UserSlice.reducer;
