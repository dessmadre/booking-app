import { useReducer } from 'react';
import axios from 'axios';

import BookingContext from './bookingContext';
import BookingReducer from './bookingReducer';
import {
  GET_EVENTS,
  GET_EVENTS_ERROR,
  NEW_EVENT,
  NEW_EVENT_ERROR,
  DELETE_EVENT,
  DELETE_EVENT_ERROR,
  EVENTS_LOADING,
} from '../types';

const BookingState = (props) => {
  const initialState = {
    events: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(BookingReducer, initialState);

  const getEvents = async () => {
    eventsLoading();
    try {
      const { data: events } = await axios.get('http://localhost:3001/event');
      dispatch({
        type: GET_EVENTS,
        payload: events,
      });
    } catch (err) {
      console.log('Error retrieving days');
      dispatch({
        type: GET_EVENTS_ERROR,
      });
    }
  };

  const newEvent = async (hour, weekday, dateString) => {
    eventsLoading();
    try {
      await axios.post('http://localhost:3001/event/new', {
        hour,
        weekday,
        dateString,
      });

      const { data: events } = await axios.get('http://localhost:3001/event');
      dispatch({
        type: NEW_EVENT,
        payload: events,
      });
    } catch (err) {
      console.log('Error creating a new event');
      dispatch({
        type: NEW_EVENT_ERROR,
      });
    }
  };

  const deleteEvent = async (eventId) => {
    eventsLoading();
    try {
      await axios.delete(`http://localhost:3001/${eventId}`);

      const { data: events } = await axios.get('http://localhost:3001/event');

      dispatch({
        type: DELETE_EVENT,
        payload: events,
      });
    } catch (err) {
      console.log('Error deleting event');
      dispatch({
        type: DELETE_EVENT_ERROR,
      });
    }
  };

  const eventsLoading = () => dispatch({ type: EVENTS_LOADING });

  return (
    <BookingContext.Provider
      value={{
        events: state.events,
        loading: state.loading,
        getEvents,
        newEvent,
        deleteEvent,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
