import axios from "axios";

export default {
  trip: {
    byLocation: location =>
      axios.get("/api/trips/location/" + location).then(res => res.data),
    byId: tripId => axios.get("/api/trips/" + tripId).then(res => res.data)
  }
};
