import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";


const allReducers = combineReducers({

});

export const store = configureStore({
  reducer: allReducers,
});

export type RootState = ReturnType<typeof store.getState>;