import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import appApi from "../services/appApi";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        name: user.name,
        email: user.name,
        password: user.password,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const GetMe = createAsyncThunk("user/GetMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogoutUser = createAsyncThunk("user/LogoutUser", async () => {
  await axios.delete("http://localhost:5000/logout");
});
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {},
    resetNotification: (state, { payload }) => {},
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Get User Login

    builder.addCase(GetMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(GetMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // //save user after signUp
    // builder.addMatcher(
    //   appApi.endpoints.signUpUser.matchFulfilled,
    //   (state, { payload }) => payload
    // );
    // //save user after login
    // builder.addMatcher(
    //   appApi.endpoints.logInUser.matchFulfilled,
    //   (state, { payload }) => payload
    // );
    // //destroy user after logout
    // builder.addMatcher(appApi.endpoints.logOutUser.matchFulfilled, () => null);
  },
});

export const { addNotification, resetNotification, reset } = userSlice.actions;
export default userSlice.reducer;
