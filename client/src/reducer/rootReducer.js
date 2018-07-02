import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tripReducer from "./tripReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  trips: tripReducer
});

export default rootReducer;
