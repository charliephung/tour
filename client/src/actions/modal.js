import { OPEN_MODAL, CLOSE_MODAL } from "../constants/actionTypes";

export const actOpenModal = () => dispatch =>
  dispatch({
    type: OPEN_MODAL
  });
export const actCloseModal = () => dispatch =>
  setTimeout(() => {
    dispatch({
      type: CLOSE_MODAL
    });
  }, 500);
