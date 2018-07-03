import axios from "axios";
import {
  FETCH_TRIP_BY_LOCATION,
  CANCEL_FETCH_TRIP
} from "../constants/actionTypes";

export const actFetchTrip = location => {
  return async (dispatch, getState) => {
    try {
      const currentTrips = await getState().trips;
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
