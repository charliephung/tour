import {
  FETCH_TRIP_LOADING_START,
  FETCH_TRIP_LOADING_END,
  FETCH_TRIPS_LOADING_START,
  FETCH_TRIPS_LOADING_END,
  ADD_COMMENT_LOADING_START,
  ADD_COMMENT_LOADING_END,
  DELETE_COMMENT_LOADING_START,
  DELETE_COMMENT_LOADING_END,
  RATE_TRIP_LOADING_START,
  RATE_TRIP_LOADING_END
} from "../constants/actionTypes";

const initialState = {
  fetchTripIsLoading: true,
  fetchTripsIsLoading: true,
  addCommentIsLoading: false,
  deleteCommentIsLoading: false,
  rateTripIsLoading: false
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
    // add comments
    case ADD_COMMENT_LOADING_START:
      return { ...state, addCommentIsLoading: true };
    case ADD_COMMENT_LOADING_END:
      return { ...state, addCommentIsLoading: false };
    // Delete comments
    case DELETE_COMMENT_LOADING_START:
      return { ...state, deleteCommentIsLoading: true };
    case DELETE_COMMENT_LOADING_END:
      return { ...state, deleteCommentIsLoading: false };
    // Rate trip
    case RATE_TRIP_LOADING_START:
      console.log("here");
      console.log(state);

      return { ...state, rateTripIsLoading: true };
    case RATE_TRIP_LOADING_END:
      return { ...state, rateTripIsLoading: false };

    default:
      return state;
  }
};

export default asyncReducer;
