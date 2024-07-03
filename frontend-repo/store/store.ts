import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userInfoSlice";
export const store = configureStore({
  reducer: {
    userInfoReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;