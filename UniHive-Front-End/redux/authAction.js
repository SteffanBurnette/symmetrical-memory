import { createAsyncThunk } from "@reduxjs/toolkit";
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      selectedCollege,
      selectedMajor,
      fullName,
      collegeLevel,
      supabase,
    },
    { rejectWithValue }
  ) => {
    try {
      //signing up the user using supabase.auth
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      //if sign up is successful put user data from form into the User table and return the query
      const { data: insertData, error: insertError } = await supabase
        .from("User")
        .insert([
          {
            name: fullName,
            college_level: collegeLevel,
            email: email,
            password: password,
            major: selectedMajor,
            college: selectedCollege,
          },
        ])
        .select();
      if (insertData) {
        console.log(insertData);
      }
      if (insertError) {
        console.log(insertError);
      }

      //expermiment with setting local storage

      if (user) {
        console.log(user);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      // return custom error message from Supabase if present
      if (error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An error occurred while signing up.");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, supabase }, { rejectWithValue }) => {
    try {
      //signing in the user using supabase.auth

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      return data;
    } catch (error) {
      // return custom error message from Supabase if present
      if (error.message) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An error occurred while signing up.");
      }
    }
  }
);
