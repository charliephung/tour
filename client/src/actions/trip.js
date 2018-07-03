import axios from "axios";
import {
  FETCH_TRIP_BY_LOCATION,
  FETCH_TRIP_BY_ID,
  CANCEL_FETCH_TRIP
} from "../constants/actionTypes";

export const actFetchTrip = location => {
  return async dispatch => {
    try {
      const trips = await axios.get("/api/trips/location/" + location);
      dispatch({
        type: FETCH_TRIP_BY_LOCATION,
        payload: {
          location,
          trips: trips.data
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_TRIP_BY_LOCATION,
        payload: {
          location,
          trips: []
        }
      });
    }
  };
};

export const actFetchTripContent = tripId => {
  return async dispatch => {
    try {
      const trip = await axios.get("/api/trips/" + tripId);
      dispatch({
        type: FETCH_TRIP_BY_ID,
        payload: {
          trip: trip.data
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_TRIP_BY_ID,
        payload: {}
      });
    }
  };
};
