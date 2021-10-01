import axios from 'axios';

import AvailabilityDashboard from '../components/AvailabilityDashboard';
import BookingDashboard from '../components/Booking/BookingDashboard';
import DashBoardLayout from '../components/layout/DashboardLayout';

export default function Dashboard({ days, bookings }) {
  return (
    <DashBoardLayout>
      <AvailabilityDashboard days={days} />
      <BookingDashboard bookings={bookings} />
    </DashBoardLayout>
  );
}

export async function getStaticProps() {
  const { data: days } = await axios.get('http://localhost:3001/day');
  const { data: bookings } = await axios.get('http://localhost:3001/event');

  return {
    props: {
      days,
      bookings,
    },
  };
}
