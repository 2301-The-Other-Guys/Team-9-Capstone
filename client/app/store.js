import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/slices/TaskSlice";

const store = configureStore({
  reducer: { auth: authReducer, tasks: taskReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/slices/TaskSlice";
