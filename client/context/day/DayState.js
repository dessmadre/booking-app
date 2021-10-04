import { useReducer } from 'react';
import axios from 'axios';

import DayContext from './dayContext';
import DayReducer from './dayReducer';
import {
  GET_DAYS,
  GET_DAYS_ERROR,
  UPDATE_DAY_AVAILABILITY_TRUE,
  UPDATE_DAY_AVAILABILITY_TRUE_ERROR,
  UPDATE_DAY_AVAILABILITY_FALSE,
  UPDATE_DAY_AVAILABILITY_FALSE_ERROR,
  DAYS_LOADING,
} from '../types';

const DayState = (props) => {
  // Initial State
  const initialState = {
    days: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(DayReducer, initialState);

  /* Day Actions */

  // Get an array of days
  const getDays = async () => {
    daysLoading();
    try {
      const { data: days } = await axios.get(`http://localhost:3001/day`);
      dispatch({
        type: GET_DAYS,
        payload: days,
      });
    } catch (err) {
      console.log('Error retrieving days');
      dispatch({
        type: GET_DAYS_ERROR,
      });
    }
  };

  // Update a the availablity of a day to true
  const updateDayTrue = async (dayId) => {
    try {
      const { data: day } = await axios.patch(
        `http://localhost:3001/day/${dayId}/true`
      );
      dispatch({
        type: UPDATE_DAY_AVAILABILITY_TRUE,
        payload: day,
      });
    } catch (err) {
      console.log('Error updating the availabilty of the selected day.');
      dispatch({
        type: UPDATE_DAY_AVAILABILITY_TRUE_ERROR,
      });
    }
  };

  // update the availablity of a day to false
  const updateDayFalse = async (dayId) => {
    try {
      const { data: day } = await axios.patch(
        `http://localhost:3001/day/${dayId}/false`
      );
      dispatch({
        type: UPDATE_DAY_AVAILABILITY_FALSE,
        payload: day,
      });
    } catch (err) {
      console.log('Error updating to availability of the selected day');
      dispatch({
        type: UPDATE_DAY_AVAILABILITY_FALSE_ERROR,
      });
    }
  };

  const daysLoading = () => dispatch({ type: DAYS_LOADING });

  return (
    <DayContext.Provider
      value={{
        day: state.day,
        days: state.days,
        loading: state.loading,
        getDays,
        updateDayTrue,
        updateDayFalse,
      }}
    >
      {props.children}
    </DayContext.Provider>
  );
};

export default DayState;
