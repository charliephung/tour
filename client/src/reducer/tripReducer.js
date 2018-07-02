import { FETCH_TRIP_BY_LOCATION } from "../constants/actionTypes";

const initialState = [];

const tripReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_TRIP_BY_LOCATION:
      console.log(actions);

      return [...actions.payload];

    default:
      return [];
  }
};

export default tripReducer;
