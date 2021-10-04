import { useContext, useState } from 'react';
import DayContext from '../context/day/dayContext';

export default function AvailabilitySetter({ day }) {
  const dayContext = useContext(DayContext);
  const [isAvailable, setIsAvailable] = useState(day.isAvailable);
  const { updateDayTrue, updateDayFalse } = dayContext;

  return (
    <figure className={`flex flex-col my-1 p-3 border-transparent border-4`}>
      <figure className='flex justify-between items-center'>
        <p
          className={`${
            isAvailable ? 'text-black' : 'text-gray-400'
          } md:text-2xl font-semibold justify-self-start`}
        >
          {day.day}
        </p>

        <figure className=' justify-self-ends'>
          <button
            className='bg-blue-300 hover:bg-blue-400 text-xs md:text-lg p-1 md:p-2 ml-1 mr-1 md:mr-5 rounded-lg'
            onClick={() => {
              updateDayTrue(day._id);
              setIsAvailable(true);
            }}
          >
            Available
          </button>
          <button
            className='bg-red-300 hover:bg-red-400 text-xs md:text-lg p-1 md:p-2  md:ml-0 rounded-lg'
            onClick={() => {
              updateDayFalse(day._id);
              setIsAvailable(false);
            }}
          >
            Not Available
          </button>
        </figure>
      </figure>
    </figure>
  );
}
