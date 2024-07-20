import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { userApi } from "./services/userApi";
import { ordersApi } from "./services/ordersApi";
import { chatApi } from "./services/chatApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authApi.middleware,
        userApi.middleware,
        ordersApi.middleware,
        chatApi.middleware,
      ]),
  });
};
