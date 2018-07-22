import { FETCH_TRIP_BY_ID, ADD_COMMENT } from "../constants/actionTypes";

const initialState = {};

const tripContentReducer = (state = initialState, actions) => {
  let index;
  switch (actions.type) {
    case FETCH_TRIP_BY_ID:
      return {
        ...actions.payload.trip
      };
    case ADD_COMMENT:
      return { ...state, ...state.reviews.unshift(actions.payload) };

    default:
      return state;
  }
};

export default tripContentReducer;
