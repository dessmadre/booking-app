import {
  GET_DAYS,
  UPDATE_DAY_AVAILABILITY_TRUE,
  UPDATE_DAY_AVAILABILITY_FALSE,
  DAYS_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DAYS ||
      UPDATE_DAY_AVAILABILITY_TRUE ||
      UPDATE_DAY_AVAILABILITY_FALSE:
      return {
        ...state,
        days: action.payload,
        loading: false,
      };
    case DAYS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
