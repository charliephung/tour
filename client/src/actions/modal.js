import { OPEN_MODAL, CLOSE_MODAL } from "../constants/actionTypes";

export const actOpenModal = () => dispatch => {
  return dispatch({
    type: OPEN_MODAL
  });
};
export const actCloseModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
