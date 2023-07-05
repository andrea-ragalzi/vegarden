import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loginReducer from "../reducers/loginReducer";
import zenyteReducer from "../reducers/zenyteReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const allReducers = combineReducers({
  login: loginReducer,
  zenyte: zenyteReducer
});

const persistConfig = {
  key: "root",
  storage,
  // Puoi specificare qui il whitelist o il blacklist dei reducer
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
