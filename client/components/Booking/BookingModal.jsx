import axios from 'axios';
import { useState } from 'react';

export default function BookingModal({ day, hour, setBooking, setHour }) {
  const [confirm, setConfirm] = useState(false);
  const handleClick = (e) => {
    if (
      e.target.classList.contains('backdrop') ||
      e.target.classList.contains('bg-red-300')
    ) {
      setBooking(null);
      setHour(null);
    }
  };
  const dateTime = `${day.date} @ ${hour.hour}`;
  const handleBooking = async () => {
    const res = await axios.post('', {
      dateTime,
    });
  };

  return (
    <div
      className='backdrop fixed top-0 left-0 w-screen h-screen flex justify-center items-center'
      onClick={handleClick}
    >
      <div className='w-2/3 h-2/3 bg-white rounded-2xl'>
        <div className='w-full h-full p-5 flex flex-col justify-center items-center'>
          <h4 className='text-4xl font-semibold'>
            Do you want to book this time?
          </h4>

          <p className='text-3xl mt-5'>{dateTime}</p>
          <div className='w-full mt-16 flex justify-center items-end'>
            <button className='bg-red-300 hover:bg-red-400 py-5 px-8 rounded-3xl m-1 mr-3 text-2xl font-semibold'>
              Cancel
            </button>
            <button
              className={`${
                confirm && 'hidden'
              } bg-green-300 hover:bg-green-400 py-5 px-8 m-1 ml-3 rounded-3xl text-2xl font-semibold`}
              onClick={() => setConfirm(true)}
            >
              Confirm
            </button>
            {confirm && (
              <button className='bg-blue-300 hover:bg-blue-400 py-5 px-12 rounded-3xl m-1 ml-3 text-2xl font-semibold'>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
