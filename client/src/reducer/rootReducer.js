import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tripReducer from "./tripReducer";
import tripContentReducer from "./tripContentReducer";
import asyncReducer from "./asyncReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  trips: tripReducer,
  tripContent: tripContentReducer,
  loading: asyncReducer
});

export default rootReducer;
