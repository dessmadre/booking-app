import { useState } from 'react';

export default function AvailabilitySetter({
  day,
  setAvailTrue,
  setAvailFalse,
}) {
  const [isAvailable, setIsAvailable] = useState(day.isAvailable);

  return (
    <div className={`flex flex-col my-1 p-3 border-transparent border-4 `}>
      <div className='flex justify-between items-center'>
        <p
          className={`${
            isAvailable ? 'text-black' : 'text-gray-400'
          } text-2xl font-semibold justify-self-start`}
        >
          {day.day}
        </p>

        <div className='justify-self-end'>
          <button
            className='bg-blue-300 hover:bg-blue-400 p-2 mr-5 rounded-lg'
            onClick={() => {
              setAvailTrue(day._id);
              setIsAvailable(true);
            }}
          >
            Available
          </button>
          <button
            className='bg-red-300 hover:bg-red-400 p-2 rounded-lg'
            onClick={() => {
              setAvailFalse(day._id);
              setIsAvailable(false);
            }}
          >
            Not Available
          </button>
        </div>
      </div>
    </div>
  );
}
