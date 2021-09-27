import axios from 'axios';
import HoursAvailable from '../components/Hour/HoursAvailable';

import DashBoardLayout from '../components/layout/DashboardLayout';

export default function Days({ days }) {
  const daysAvailable = days.filter((d) => d.isAvailable);

  return (
    <DashBoardLayout>
      <div className='my-10 p-8 bg-gray-100 rounded-md shadow-xl'>
        <h3 className='text-4xl font-bold'>Set the hours you are available</h3>
        <p className='text-lg w-5/6 '>
          Hours are set to unavailable by default, if you want to make an hour
          available click on it.
        </p>
        <HoursAvailable days={daysAvailable} />
      </div>
    </DashBoardLayout>
  );
}

export async function getStaticProps() {
  const { data: days } = await axios.get('http://localhost:3001/day');

  return {
    props: {
      days,
    },
  };
}
