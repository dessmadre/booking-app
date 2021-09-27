import axios from 'axios';

import AvailabilityDashboard from '../components/AvailabilityDashboard';
import DashBoardLayout from '../components/layout/DashboardLayout';

export default function Dashboard({ days }) {
  return (
    <DashBoardLayout>
      <AvailabilityDashboard days={days} />
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
