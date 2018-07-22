import axios from "axios";

export default {
  trip: {
    byLocation: location =>
      axios.get("/api/trips/location/" + location).then(res => res.data),
    byId: tripId => axios.get("/api/trips/" + tripId).then(res => res.data)
  },
  auth: {
    withGoogle: data => {
      return axios.post("/api/auth/google/", data).then(res => res.data);
    }
  },
  user: {
    comment: (tripId, data) => {
      return axios
        .post(`/api/trips/${tripId}/review`, data)
        .then(res => res.data);
    },
    deleteComment: (tripId, data) => {
      return axios
        .delete(`/api/trips/${tripId}/review/${data.commentId}`, { data })
        .then(res => res.data);
    },
    rate: (tripId, data) => {
      return axios
        .post(`/api/trips/${tripId}/rate/${data}`)
        .then(res => res.data);
    }
  }
};
