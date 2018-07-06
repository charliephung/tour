import { OPEN_MODAL, CLOSE_MODAL } from "../constants/actionTypes";

const initialState = false;

export const modalReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case OPEN_MODAL:
      return true;
    case CLOSE_MODAL:
      return false;
    default:
      return false;
  }
};

export default modalReducer;
