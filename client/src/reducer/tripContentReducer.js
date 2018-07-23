import {
  FETCH_TRIP_BY_ID,
  ADD_COMMENT,
  DELETE_COMMENT,
  RATE_TRIP
} from "../constants/actionTypes";

const initialState = {};

const tripContentReducer = (state = initialState, actions) => {
  let index;
  switch (actions.type) {
    case FETCH_TRIP_BY_ID:
      return {
        ...actions.payload.trip
      };
    case ADD_COMMENT:
      return { ...state, ...state.reviews.unshift(actions.payload) };
    case DELETE_COMMENT:
      index = state.reviews.findIndex(ele => ele._id === actions.payload);
      return { ...state, ...state.reviews.splice(index, 1) };
    case RATE_TRIP:
      const { userId, data } = actions.payload;
      index = state.rating.findIndex(ele => ele.user == userId);
      if (index === -1) {
        return {
          ...state,
          ...state.rating.push({
            user: userId,
            rate: data
          })
        };
      }
      return {
        ...state,
        ...(state.rating[index] = {
          user: userId,
          rate: data
        })
      };

    default:
      return state;
  }
};

export default tripContentReducer;
