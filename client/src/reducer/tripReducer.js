import {
  FETCH_TRIP_BY_LOCATION,
  CANCEL_FETCH_TRIP
} from "../constants/actionTypes";

const initialState = [];

const tripReducer = (state = initialState, actions) => {
  let index;
  switch (actions.type) {
    case FETCH_TRIP_BY_LOCATION:
      return [...state, { ...actions.payload }];
    default:
      return [];
  }
};

export default tripReducer;
