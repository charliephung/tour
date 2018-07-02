import axios from "axios";

export const actFetchTrip = () => {
  return async dispatch => {
    try {
      let trips = await axios.get("/api/trips/location/" + "turku");
      console.log(trips);
    } catch (error) {
      console.log(error);
    }
  };
};
