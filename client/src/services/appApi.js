import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    logInUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    logOutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
    getUsers: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "GET",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLogInUserMutation,
  useLogOutUserMutation,
  useSignUpUserMutation,
  useGetUsersMutation,
} = appApi;

export default appApi;
