import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSwarm: null,
  showDiscover: null,
  showPosts: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setShowSwarm: (state) => {
      state.showSwarm = true;
      state.showDiscover = false;
      state.showPosts = false;
    },
    setShowDiscover: (state) => {
      state.showSwarm = false;
      state.showDiscover = true;
      state.showPosts = false;
    },
    setShowPosts: (state) => {
      state.showSwarm = false;
      state.showDiscover = false;
      state.showPosts = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowSwarm, setShowDiscover, setShowPosts } =
  userSlice.actions;

export default userSlice.reducer;