import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tripReducer from "./tripReducer";
import asyncReducer from "./asyncReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  trips: tripReducer,
  loading: asyncReducer
});

export default rootReducer;
