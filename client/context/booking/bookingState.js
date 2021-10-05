import { useReducer } from 'react';
import axios from 'axios';

import BookingContext from './bookingContext';
import BookingReducer from './bookingReducer';
import {
  GET_BOOKINGS,
  GET_BOOKINGS_ERROR,
  NEW_BOOKING,
  NEW_BOOKING_ERROR,
  DELETE_BOOKING,
  DELETE_BOOKING_ERROR,
  BOOKINGS_LOADING,
} from '../types';

const BookingState = (props) => {
  const initialState = {
    bookings: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(BookingReducer, initialState);

  const getBookings = async () => {
    bookingsLoaded();
    try {
      const { data: bookings } = await axios.get('http://localhost:3001/event');
      dispatch({
        type: GET_BOOKINGS,
        payload: bookings,
      });
    } catch (err) {
      console.log('Error retrieving days');
      dispatch({
        type: GET_BOOKINGS_ERROR,
      });
    }
  };

  const newBooking = async ({ hour, weekday, dateString }) => {
    bookingsLoaded();
    try {
      await axios.post('http://localhost:3001/event/new', {
        hour,
        weekday,
        dateString,
      });

      const { data: bookings } = await axios.get('http://localhost:3001/event');
      dispatch({
        type: NEW_BOOKING,
        payload: bookings,
      });
    } catch (err) {
      console.log('Error creating a new booking');
      dispatch({
        type: NEW_BOOKING_ERROR,
      });
    }
  };

  const deleteBooking = async (bookingId) => {
    bookingsLoaded();
    try {
      await axios.delete(`http://localhost:3001/${bookingId}`);

      const { data: bookings } = await axios.get('http://localhost:3001/event');

      dispatch({
        type: DELETE_BOOKING,
        payload: bookings,
      });
    } catch (err) {
      console.log('Error deleting booking');
      dispatch({
        type: DELETE_BOOKING_ERROR,
      });
    }
  };

  const bookingsLoaded = () => dispatch({ type: BOOKINGS_LOADING });

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        loading: state.loading,
        getBookings,
        newBooking,
        deleteBooking,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
