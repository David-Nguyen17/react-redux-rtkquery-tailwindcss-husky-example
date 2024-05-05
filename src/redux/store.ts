import AppSlice from "@/rtk-api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist";
import persistedReducer from "./rootReducers";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(AppSlice.middleware),
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
