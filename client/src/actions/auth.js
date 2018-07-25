import api from "./api/api";
import { SET_USER_TOKEN, REMOVE_USER_TOKEN } from "../constants/actionTypes";

export const actGoogleLogin = data => dispatch => {
  console.log(data);

  api.auth.withGoogle(data).then(res => {
    console.log(res);

    dispatch({
      type: SET_USER_TOKEN,
      payload: res
    });
  });
};

export const actLogout = () => dispatch => {
  dispatch({
    type: REMOVE_USER_TOKEN
  });
};
