import { useState } from 'react';
import BookingModal from '../Booking/BookingModal';
import CalendarHeader from '../CalendarHeader';

export default function HourModal({ day, setDay }) {
  const [booking, setBooking] = useState(null);
  const [hour, setHour] = useState(null);

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setDay(null);
    }
  };

  const hours = day.weekday[0].hours;

  return (
    <section
      className='backdrop fixed top-0 left-0 w-screen h-screen flex justify-center items-center'
      onClick={handleClick}
    >
      <article className='md:max-w-3xl max-w-2xl bg-white rounded-2xl p-5'>
        <CalendarHeader dayDisplay={day.date} />
        <figure className='w-full bg-red-400 flex flex-wrap justify-start py-3'>
          {hours.map((h) => {
            const [hour, beforeMidday] = h.hour.split(' ');
            return (
              <figure
                key={h._id}
                className={`w-1/6 h-1/4 bg-indigo-200 flex flex-col justify-center items-center px-4 py-10`}
                onClick={() => {
                  if (h.isAvailable) {
                    setBooking(day);
                    setHour(h);
                  }
                }}
              >
                <p
                  className={`md:text-xl bg-pink-200 text-left uppercase h-full ${
                    h.isAvailable
                      ? 'text-black hover:bg-gray-200 cursor-pointer'
                      : 'text-gray-400 cursor-default'
                  } px-4 py-2 font-semibold rounded-full`}
                >
                  {hour}
                  <span className='text-xs md:text-sm'>{beforeMidday}</span>
                </p>
              </figure>
            );
          })}
        </figure>
      </article>
      {booking && (
        <BookingModal
          day={booking}
          hour={hour}
          setBooking={setBooking}
          setHour={setHour}
        />
      )}
    </section>
  );
}
