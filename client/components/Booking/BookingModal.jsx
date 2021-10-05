import axios from 'axios';
import { useContext, useState } from 'react';
import BookingContext from '../../context/booking/bookingContext';

export default function BookingModal({ day, hour, setBooking, setHour }) {
  const bookingContext = useContext(BookingContext);
  const { newBooking } = bookingContext;
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
  console.log('Hour', hour);
  console.log('Day', day);
  const dateTime = `${day.date} @ ${hour.hour}`;
  const handleBooking = async () => {
    try {
      const bookingRequest = {
        hour: hour.hour,
        weekday: day.weekday[0].day,
        dateString: day.date,
      };
      newBooking(bookingRequest);
      setBooking(null);
      setHour(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      className='backdrop fixed top-0 left-0 w-screen h-screen flex justify-center items-center'
      onClick={handleClick}
    >
      <section className='bg-white h-2/3 rounded-2xl'>
        <div className='w-full h-full p-2 flex flex-col justify-center items-center'>
          <h4 className='text-xl md:text-4xl font-semibold px-0.5'>
            Do you want to book this time?
          </h4>

          <p className='md:text-3xl mt-5'>{dateTime}</p>
          <div className='w-full mt-16 flex justify-center items-end'>
            <button className='bg-red-300 hover:bg-red-400 py-4 md:py-5 px-6 md:px-8 rounded-3xl m-1 mr-3 md:text-2xl font-semibold'>
              Cancel
            </button>
            <button
              className={`${
                confirm && 'hidden'
              } bg-green-300 hover:bg-green-400 py-4 md:py-5 px-6 md:px-8 m-1 ml-3 rounded-3xl md:text-2xl font-semibold`}
              onClick={() => setConfirm(true)}
            >
              Confirm
            </button>
            {confirm && (
              <button
                className='bg-blue-300 hover:bg-blue-400 py-4 md:py-5 px-8 md:px-12 rounded-3xl m-1 ml-3 md:text-2xl font-semibold'
                onClick={handleBooking}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
