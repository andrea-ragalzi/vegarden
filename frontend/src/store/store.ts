import { combineReducers } from "redux";
import loginReducer from "../reducers/loginReducer";
import zenyteReducer from "../reducers/zenyteReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import profileReducer from "../reducers/profileReducer";
import blogReducer from "../reducers/blogReducer";
import articleReducer from "../reducers/articleReducer";
import registerReducer from "../reducers/registerReducer";
import { configureStore } from "@reduxjs/toolkit";
import articleReactionReducer from "../reducers/articleReactionReducer";
import articleSavedReducer from "../reducers/articleSavedReducer";
import zenHubReducer from "../reducers/zenHubReducer";
import followerReducer from "../reducers/followerReducer.ts";
import categoryReducer from "../reducers/categoryReducer.ts";

const rootReducer = combineReducers({
  login: loginReducer,
  zenyte: zenyteReducer,
  profile: profileReducer,
  blog: blogReducer,
  article: articleReducer,
  register: registerReducer,
  articleReaction: articleReactionReducer,
  articleSaved: articleSavedReducer,
  zenHub: zenHubReducer,
  follower: followerReducer,
  category: categoryReducer
});

const RESET_STORE = "RESET_STORE";

export const resetStoreAction = { type: RESET_STORE };

const resettableReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, resettableReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;