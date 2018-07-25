import { FETCH_TRIPS_BY_LOCATION } from "../constants/actionTypes";

const initialState = [];

const tripReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_TRIPS_BY_LOCATION:
      return [...state, { ...actions.payload }];
    default:
      return [...state];
  }
};

export default tripReducer;
