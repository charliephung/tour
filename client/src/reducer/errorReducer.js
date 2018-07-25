import { ERROR } from "../constants/actionTypes";

const initialState = {};

const errorReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ERROR:
      return { ...state, ...actions.payload };

    default:
      return {};
  }
};

export default errorReducer;
