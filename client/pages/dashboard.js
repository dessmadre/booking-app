import { useContext, useEffect } from 'react';

import AvailabilityDashboard from '../components/AvailabilityDashboard';
import BookingDashboard from '../components/Booking/BookingDashboard';
import DashBoardLayout from '../components/layout/DashboardLayout';
import DayContext from '../context/day/dayContext';
import BookingContext from '../context/booking/bookingContext';

export default function Dashboard() {
  const dayContext = useContext(DayContext);
  const bookingContext = useContext(BookingContext);
  const { loading: daysLoading, days, getDays } = dayContext;
  const { loading: bookingsLoading, bookings, getBookings } = bookingContext;

  useEffect(() => {
    getDays();
    getBookings();
  }, []);

  return (
    <DashBoardLayout>
      {daysLoading ? 'LOADING' : <AvailabilityDashboard days={days} />}
      {bookingsLoading ? 'LOADING' : <BookingDashboard bookings={bookings} />}
    </DashBoardLayout>
  );
}
