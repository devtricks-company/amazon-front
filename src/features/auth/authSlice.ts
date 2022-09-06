import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "./models/DisplayUser.interface";
import { Jwt } from "./models/jwt";
import { LoginUser } from "./models/LoginUser.interface";
import { NewUser } from "./models/NewUser";
import authServiec from "./services/auth.services";

const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUser = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt = !!storedJwt ? JSON.parse(storedJwt) : null;

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
  user: user,
  jwt: jwt,
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

export const login = createAsyncThunk(
  "auth/login",
  (user: LoginUser, thunkApi) => {
    try {
      return authServiec.login(user);
    } catch (error) {
      return thunkApi.rejectWithValue("login failed");
    }
  }
);

export const jwtVerify = createAsyncThunk(
  "auth/jwtVerify",
  (jwt: string, thunkApi) => {
    try {
      return authServiec.verifyJwt(jwt);
    } catch (error) {
      return thunkApi.rejectWithValue("jwt verify failed");
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
    logout: (state: AuthState) => {
      authServiec.logout();
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.jwt = null;
      state.user = null;
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
      })

      //Login
      .addCase(login.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload;
        state.isAuthentication = true;
      })
      .addCase(login.rejected, (state: AuthState) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthentication = false;
      })

      //Jwt verfiy
      .addCase(jwtVerify.pending, (state: AuthState) => {
        state.isLoading = true;
      })
      .addCase(jwtVerify.fulfilled, (state: AuthState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = null;
        state.isAuthentication = action.payload;
      })
      .addCase(jwtVerify.rejected, (state: AuthState) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.jwt = null;
        state.isAuthentication = false;
      });
  },
});
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
