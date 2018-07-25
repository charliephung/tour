import api from "./api/api";

import {
  FETCH_TRIPS_BY_LOCATION,
  FETCH_TRIP_BY_ID,
  FETCH_TRIP_LOADING_START,
  FETCH_TRIP_LOADING_END,
  FETCH_TRIPS_LOADING_START,
  FETCH_TRIPS_LOADING_END,
  ADD_COMMENT_LOADING_START,
  ADD_COMMENT_LOADING_END,
  DELETE_COMMENT_LOADING_START,
  DELETE_COMMENT_LOADING_END,
  RATE_TRIP_LOADING_START,
  RATE_TRIP_LOADING_END,
  ADD_COMMENT,
  DELETE_COMMENT,
  RATE_TRIP,
  ERROR,
  BOOKING,
  BOOKING_LOADING_START,
  BOOKING_LOADING_END
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

export const actAddComment = (tripId, data) => dispatch => {
  dispatch({ type: ADD_COMMENT_LOADING_START });
  api.user
    .comment(tripId, data)
    .then(res => {
      dispatch({ type: ADD_COMMENT, payload: res });
      dispatch({ type: ADD_COMMENT_LOADING_END });
    })
    .catch(err => {
      dispatch({ type: ADD_COMMENT_LOADING_END });
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
export const actDeleteComment = (tripId, data) => dispatch => {
  dispatch({ type: DELETE_COMMENT_LOADING_START });
  api.user.deleteComment(tripId, data).then(res => {
    dispatch({ type: DELETE_COMMENT, payload: data.commentId });
    dispatch({ type: DELETE_COMMENT_LOADING_END });
  });
};

export const actRateTrip = (userId, tripId, data) => dispatch => {
  dispatch({ type: RATE_TRIP_LOADING_START });
  api.user.rate(tripId, data).then(res => {
    dispatch({
      type: RATE_TRIP,
      payload: {
        userId,
        data
      }
    });
    dispatch({ type: RATE_TRIP_LOADING_END });
  });
};

export const actBook = (tripId, data) => dispatch => {
  dispatch({ type: BOOKING_LOADING_START });
  api.user
    .book(tripId, data)
    .then(res => {
      dispatch({
        type: BOOKING,
        payload: res.data
      });
      dispatch({ type: BOOKING_LOADING_END });
    })
    .catch(err => {
      dispatch({ type: BOOKING_LOADING_END });
      dispatch({ type: ERROR, payload: err.response.data });
    });
};
