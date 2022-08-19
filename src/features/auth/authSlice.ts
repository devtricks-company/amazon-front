import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "./models/DisplayUser.interface";
import { Jwt } from "./models/jwt";
import { NewUser } from "./models/NewUser";
import authServiec from "./services/auth.service";

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

export const register = createAsyncThunk(
  "auth/register",
  (user: NewUser, thunkApi) => {
    try {
      return authServiec.register(user);
    } catch (error) {
      return thunkApi.rejectWithValue("register failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state: AuthState) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
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
