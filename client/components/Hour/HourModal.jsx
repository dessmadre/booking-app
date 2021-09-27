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
    <div
      className='backdrop fixed top-0 left-0 w-screen h-screen flex justify-center items-center'
      onClick={handleClick}
    >
      <div className='w-5/6 h-5/6 bg-white rounded-2xl '>
        <CalendarHeader dayDisplay={day.date} />
        <div className='w-full h-5/6  flex flex-wrap justify-center pt-1 '>
          {hours.map((h) => {
            return (
              <div
                key={h._id}
                className='w-1/7 m-1  flex flex-col justify-center items-center'
                onClick={() => {
                  if (h.isAvailable) {
                    setBooking(day);
                    setHour(h);
                  }
                }}
              >
                <p
                  className={`text-xl ${
                    h.isAvailable
                      ? 'text-black hover:bg-gray-200 cursor-pointer'
                      : 'text-gray-400 cursor-default'
                  }  p-5 font-semibold rounded-full`}
                >
                  {h.hour}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {booking && (
        <BookingModal
          day={booking}
          hour={hour}
          setBooking={setBooking}
          setHour={setHour}
        />
      )}
    </div>
  );
}
