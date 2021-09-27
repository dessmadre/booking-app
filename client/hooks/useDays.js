import axios from 'axios';
import { useEffect, useState } from 'react';

export const useDate = (nav) => {
  const [dateDisplay, setDateDisplay] = useState('');
  const [days, setDays] = useState([]);

  const fetchDays = async () => {
    try {
      const res = await axios.get('http://localhost:3001/day');

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(async () => {
    const daysAvailable = await fetchDays();

    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    setDateDisplay(
      `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`
    );
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      // Month/Day/Year
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: `${dt.toLocaleDateString('en-us', { month: 'long' })} ${
            i - paddingDays
          },
           ${year}`,
          weekday: daysAvailable.filter(
            (d) =>
              d.day ===
              new Date(year, month, i - paddingDays).toLocaleDateString(
                'en-us',
                { weekday: 'long' }
              )
          ),
        });
      } else {
        daysArr.push({
          value: 'padding',
          isCurrentDay: false,
          date: '',
        });
      }
    }

    setDays(daysArr);
  }, [nav]);

  return {
    days,
    dateDisplay,
  };
};
