import api from "./api/api";

import {
  FETCH_TRIP_BY_LOCATION,
  FETCH_TRIP_BY_ID
} from "../constants/actionTypes";

export const actFetchTrip = location => {
  return dispatch => {
    api.trip
      .byLocation(location)
      .then(trips => {
        dispatch({
          type: FETCH_TRIP_BY_LOCATION,
          payload: {
            location,
            trips
          }
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_TRIP_BY_LOCATION,
          payload: {
            location,
            trips: []
          }
        });
      });
  };
};

export const actFetchTripContent = tripId => {
  return dispatch => {
    api.trip
      .byId(tripId)
      .then(trip => {
        dispatch({
          type: FETCH_TRIP_BY_ID,
          payload: {
            trip
          }
        });
        return trip;
      })
      .catch(err => {
        dispatch({
          type: FETCH_TRIP_BY_ID,
          payload: {}
        });
      });
  };
};
