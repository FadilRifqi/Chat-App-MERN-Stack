import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";
import { LoginUser } from "./features/userSlice";

//persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//reducers
const reducer = combineReducers({
  auth: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [appApi.reducerPath],
};

//persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the Store

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
