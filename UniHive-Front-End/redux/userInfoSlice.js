import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  collegeLevel: "",
  selectedCollege: "",
  selectedMajor: "",
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.collegeLevel = action.payload.collegeLevel;
      state.confirmPassword = action.payload.confirmPassword;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.password = action.payload.password;
      state.selectedCollege = action.payload.selectedCollege;
      state.selectedMajor = action.payload.selectedMajor;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
