import api from "./api/api";

import {
  FETCH_TRIPS_BY_LOCATION,
  FETCH_TRIP_BY_ID,
  FETCH_TRIP_LOADING_START,
  FETCH_TRIP_LOADING_END,
  FETCH_TRIPS_LOADING_START,
  FETCH_TRIPS_LOADING_END
} from "../constants/actionTypes";

export const actFetchTrips = location => {
  return dispatch => {
    dispatch({ type: FETCH_TRIPS_LOADING_START });
    api.trip
      .byLocation(location)
      .then(trips => {
        dispatch({
          type: FETCH_TRIPS_BY_LOCATION,
          payload: {
            location,
            trips
          }
        });
        dispatch({ type: FETCH_TRIPS_LOADING_END });
      })
      .catch(err => {
        dispatch({
          type: FETCH_TRIPS_BY_LOCATION,
          payload: {
            location,
            trips: []
          }
        });
        dispatch({ type: FETCH_TRIPS_LOADING_END });
      });
  };
};

export const actFetchTripContent = tripId => {
  return dispatch => {
    dispatch({ type: FETCH_TRIP_LOADING_START });
    api.trip
      .byId(tripId)
      .then(trip => {
        dispatch({
          type: FETCH_TRIP_BY_ID,
          payload: {
            trip
          }
        });
        dispatch({ type: FETCH_TRIP_LOADING_END });
        return trip;
      })
      .catch(err => {
        dispatch({
          type: FETCH_TRIP_BY_ID,
          payload: {}
        });
        dispatch({ type: FETCH_TRIP_LOADING_END });
      });
  };
};
