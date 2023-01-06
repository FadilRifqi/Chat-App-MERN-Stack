import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addNotification: (state, { payload }) => {},
    resetNotification: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    //save user after signUp
    builder.addMatcher(
      appApi.endpoints.signUpUser.matchFulfilled,
      (state, { payload }) => payload
    );
    //save user after login
    builder.addMatcher(
      appApi.endpoints.logInUser.matchFulfilled,
      (state, { payload }) => payload
    );
    //destroy user after logout
    builder.addMatcher(appApi.endpoints.logOutUser.matchFulfilled, () => null);
  },
});

export const { addNotification, resetNotification } = userSlice.actions;
export default userSlice.reducer;
