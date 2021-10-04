import NavBar from '../components/NavBar';
import BookingState from '../context/booking/bookingState';
import DayState from '../context/day/DayState';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <DayState>
      <BookingState>
        <NavBar />
        <Component {...pageProps} />
      </BookingState>
    </DayState>
  );
}

export default MyApp;
