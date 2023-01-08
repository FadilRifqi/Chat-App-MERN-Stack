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

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/users", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
export const updateUser = createAsyncThunk(
  "user/updaeUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/${user._id}`,
        {
          name: user.name,
          img: user.img,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        console.log(error);
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

    //create new user
    builder.addCase(signUpUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
    //update user
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

export const { addNotification, resetNotification, reset } = userSlice.actions;
export default userSlice.reducer;
