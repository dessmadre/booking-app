import { GET_EVENTS, NEW_EVENT, DELETE_EVENT, EVENTS_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_EVENTS || NEW_EVENT || DELETE_EVENT:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    case EVENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
