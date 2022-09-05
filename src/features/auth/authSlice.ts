import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DisplayUser } from "./models/displayuser.interface";
import { Jwt } from "./models/jwt";
import { NewUser } from "./models/NewUser";
import authServices from "./services/auth.services";
interface AsyncState {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthentication?: boolean;
}

const initialState: AuthState = {
  user: null,
  jwt: null,
  isAuthentication: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//redux thunk : is an action that use async command

export const register = createAsyncThunk(
  `auth/register`,
  async (user: NewUser, thunkApi) => {
    try {
      return authServices.register(user);
    } catch (error) {
      return thunkApi.rejectWithValue(`register not success`);
    }
  }
);
//2 - is a regular actions

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state: AuthState) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
