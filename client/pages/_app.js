import NavBar from '../components/NavBar';
import DayState from '../context/day/DayState';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <DayState>
      <NavBar />
      <Component {...pageProps} />
    </DayState>
  );
}

export default MyApp;
