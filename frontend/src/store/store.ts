import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loginReducer from "../reducers/loginReducer";
import zenyteReducer from "../reducers/zenyteReducer";


const allReducers = combineReducers({
  login: loginReducer,
  zenyte: zenyteReducer
});

export const store = configureStore({
  reducer: allReducers,
});

export type RootState = ReturnType<typeof store.getState>;