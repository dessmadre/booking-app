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
  const bookings = day.booking;

  return (
    <section
      className='backdrop fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-2'
      onClick={handleClick}
    >
      <article className='md:max-w-3xl max-w-2xl bg-white rounded-2xl p-3 md:p-5'>
        <CalendarHeader dayDisplay={day.date} />
        <figure className='w-full flex flex-wrap justify-start py-3'>
          {hours.map((h) => {
            const isBooked = bookings.filter((b) => b.hour === h.hour) || [];
            const [hour, beforeMidday] = h.hour.split(' ');
            return (
              <figure
                key={h._id}
                className={`w-1/4 md:w-1/6 md:h-1/4 flex flex-col justify-center items-center md:px-4 py-3 md:py-10`}
                onClick={() => {
                  if (h.isAvailable && !isBooked.length) {
                    setBooking(day);
                    setHour(h);
                  }
                }}
              >
                <p
                  className={`text-xs sm:text-sm md:text-xl  text-left uppercase h-full
                  ${isBooked.length ? 'bg-blue-400 hover:bg-blue-400' : ''}
                  ${
                    h.isAvailable
                      ? 'text-black hover:bg-gray-200 cursor-pointer'
                      : 'text-gray-400 cursor-default'
                  } px-0.5 md:px-4 py-1 md:py-2 font-semibold rounded-full`}
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
