import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tripReducer from "./tripReducer";
import tripContentReducer from "./tripContentReducer";
import modalReducer from "./modalReducer";
import asyncReducer from "./asyncReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  trips: tripReducer,
  tripContent: tripContentReducer,
  loading: asyncReducer,
  modal: modalReducer
});

export default rootReducer;
