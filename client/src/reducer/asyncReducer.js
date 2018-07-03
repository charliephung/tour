import { LOADING_START, LOADING_END } from "../constants/actionTypes";

const initialState = false;

const asyncReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case LOADING_START:
      return true;
    case LOADING_END:
      return false;

    default:
      return false;
  }
};

export default asyncReducer;
