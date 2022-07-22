import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import friendsReducer from "./reducers/friendsReducer";
import chatReducer from "./reducers/chatReducer";

const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      alert: alertReducer,
      friends: friendsReducer,
      chat: chatReducer,
    },
  },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
