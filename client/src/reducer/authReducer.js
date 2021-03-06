import jwtDecode from "jwt-decode";
import { SET_USER_TOKEN, REMOVE_USER_TOKEN } from "../constants/actionTypes";
import setAuthToken from "../utils/setAuthToken";

const initialState = {};

export const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_USER_TOKEN:
      localStorage.tourJWT = actions.payload.token;
      setAuthToken(actions.payload.token);

      return jwtDecode(actions.payload.token);
    case REMOVE_USER_TOKEN:
      localStorage.removeItem("tourJWT");
      return {};
    default:
      return { ...state };
  }
};

export default authReducer;
