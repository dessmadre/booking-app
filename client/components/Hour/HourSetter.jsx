import { useState } from 'react';
import axios from 'axios';

export default function HourSetter({ hour }) {
  const [isAvailable, setIsAvailable] = useState(hour.isAvailable);

  const updateHourTrue = async (id) => {
    await axios.patch(`http://localhost:3001/hour/${id}/true`, {
      id,
    });
    setIsAvailable(true);
  };

  const updateHourFalse = async (id) => {
    await axios.patch(`http://localhost:3001/hour/${id}/false`, {
      id,
    });
    setIsAvailable(false);
  };

  const [hourString, amPm] = hour.hour.split(' ');

  return (
    <div
      key={hour._id}
      className='bg-white hover:bg-gray-100 p-2 mx-1 my-2 w-1/5 flex justify-center rounded-2xl cursor-pointer '
    >
      <p
        className={`${isAvailable ? 'text-black' : 'text-gray-400'}`}
        onClick={() =>
          isAvailable ? updateHourFalse(hour._id) : updateHourTrue(hour._id)
        }
      >
        {hourString} <span className='uppercase font-bold'>{amPm}</span>
      </p>
    </div>
  );
}
