import axios from "axios";
import { FETCH_TRIP_BY_LOCATION } from "../constants/actionTypes";

export const actFetchTrip = () => {
  return async dispatch => {
    try {
      let trips = await axios.get("/api/trips/location/" + "sai gon");

      dispatch({
        type: FETCH_TRIP_BY_LOCATION,
        payload: trips.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
