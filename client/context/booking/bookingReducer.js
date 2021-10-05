import {
  GET_BOOKINGS,
  NEW_BOOKING,
  DELETE_BOOKING,
  BOOKINGS_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKINGS || NEW_BOOKING || DELETE_BOOKING:
      return {
        ...state,
        bookings: action.payload,
        loading: false,
      };
    case BOOKINGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
