import { FETCH_TRIP_BY_ID } from "../constants/actionTypes";

const initialState = {};

const tripContentReducer = (state = initialState, actions) => {
  let index;
  switch (actions.type) {
    case FETCH_TRIP_BY_ID:
      return {
        ...actions.payload.trip
      };
    default:
      return {};
  }
};

export default tripContentReducer;
