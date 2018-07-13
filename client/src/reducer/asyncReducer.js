import {
  FETCH_TRIP_LOADING_START,
  FETCH_TRIP_LOADING_END,
  FETCH_TRIPS_LOADING_START,
  FETCH_TRIPS_LOADING_END
} from "../constants/actionTypes";

const initialState = {
  fetchTripIsLoading: true,
  fetchTripsIsLoading: true
};

const asyncReducer = (state = initialState, actions) => {
  switch (actions.type) {
    // For 1 Trip
    case FETCH_TRIP_LOADING_START:
      return { ...state, fetchTripIsLoading: true };
    case FETCH_TRIP_LOADING_END:
      return { ...state, fetchTripIsLoading: false };
    // For tripsss
    case FETCH_TRIPS_LOADING_START:
      return { ...state, fetchTripsIsLoading: true };
    case FETCH_TRIPS_LOADING_END:
      return { ...state, fetchTripsIsLoading: false };

    default:
      return state;
  }
};

export default asyncReducer;
