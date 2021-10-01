import { useState } from 'react';
import CalendarHeader from '../components/CalendarHeader';
import HourModal from '../components/Hour/HourModal';
import { useDate } from '../hooks/useDays';

export default function Home() {
  const [day, setDay] = useState(null);
  const [nav, setNav] = useState(0);
  const { days, dateDisplay } = useDate(nav);

  const weekdays = [
    { day: 'Sun' },
    { day: 'Mon' },
    { day: 'Tue' },
    { day: 'Wed' },
    { day: 'Thu' },
    { day: 'Fri' },
    { day: 'Sat' },
  ];

  return (
    <main className='max-w-2xl flex flex-col justify-center m-auto'>
      <header className='flex justify-evenly w-4/5 self-center items-baseline'>
        {/* Find better buttons icons for calendar navigation */}
        <button
          className='h-10 w-10 p-1 font-bold hover:bg-gray-200 rounded-full '
          onClick={() => setNav(nav - 1)}
        >
          &laquo;
        </button>
        <CalendarHeader dayDisplay={dateDisplay} />
        <button
          className='h-10 w-10 p-1 font-bold hover:bg-gray-200 rounded-full'
          onClick={() => setNav(nav + 1)}
        >
          &raquo;
        </button>
      </header>
      <section className=' flex justify-between'>
        {weekdays.map((w, index) => (
          <p key={index} className='w-full text-center font-semibold'>
            {w.day}
          </p>
        ))}
      </section>
      <section className='w-full flex flex-wrap p-2 mt-3 justify-start'>
        {days?.map((d, index) => {
          return (
            <figure
              key={index}
              className={`w-1/7 h-1/5 p-5  md:p-7 flex-0 ${
                d.value === 'padding' || !d.weekday[0].isAvailable
                  ? ' text-gray-400 cursor-default'
                  : 'text-black cursor-pointer hover:bg-gray-200 rounded-full'
              }  flex justify-center text-3xl font-semibold`}
              onClick={() => {
                if (d.weekday[0].isAvailable) {
                  setDay(d);
                }
              }}
            >
              {d.value === 'padding' ? '' : d.value}
            </figure>
          );
        })}
      </section>
      {day && <HourModal day={day} setDay={setDay} />}
    </main>
  );
}
