import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userInfoSlice from "./userInfoSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userInfoSlice,
  },
});

export default store;
