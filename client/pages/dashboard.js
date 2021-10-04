import axios from 'axios';
import { useContext, useEffect } from 'react';

import AvailabilityDashboard from '../components/AvailabilityDashboard';
import BookingDashboard from '../components/Booking/BookingDashboard';
import DashBoardLayout from '../components/layout/DashboardLayout';
import DayContext from '../context/day/dayContext';

export default function Dashboard({ bookings }) {
  const dayContext = useContext(DayContext);
  const { loading, days, getDays } = dayContext;

  console.log(process.env.HOST);

  useEffect(() => {
    getDays();
  }, []);

  return (
    <DashBoardLayout>
      {loading ? 'LOADING' : <AvailabilityDashboard days={days} />}
      <BookingDashboard bookings={bookings} />
    </DashBoardLayout>
  );
}

export async function getStaticProps() {
  const { data: bookings } = await axios.get('http://localhost:3001/event');

  return {
    props: {
      bookings,
    },
  };
}
