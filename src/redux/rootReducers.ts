import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AppSlice from "@/rtk-api";
import AuthSlice from "./slices/AuthSlice";

const rootReducers = combineReducers({
  "feature/auth": persistReducer(
    {
      key: "user",
      storage: storage,
      whitelist: ["access_token", "refresh_token", "user"],
    },
    AuthSlice.reducer,
  ),
  [AppSlice.reducerPath]: AppSlice.reducer,
});
const persistedReducer = persistReducer(
  {
    key: "root",
    debug: true,
    storage: storage,
    version: 1.0,
  },
  rootReducers,
);
export default persistedReducer;
