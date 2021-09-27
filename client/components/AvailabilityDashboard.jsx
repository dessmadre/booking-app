import axios from 'axios';
import Link from 'next/link';

import AvailabilitySetter from './AvailbilitySetter';

export default function AvailabilityDashboard({ days }) {
  const setAvailTrue = async (id) => {
    await axios.patch(`http://localhost:3001/day/${id}/true`, {
      id,
    });
  };
  const setAvailFalse = async (id) => {
    await axios.patch(`http://localhost:3001/day/${id}/false`, {
      id,
    });
  };

  return (
    <div className='my-10 p-8 bg-gray-100 rounded-md shadow-xl'>
      <h3 className='text-2xl font-semibold'>Set the days you are available</h3>
      <div className='flex justify-evenly'>
        <div className='mt-5 w-full'>
          {days.map((d) => {
            return (
              <AvailabilitySetter
                key={d._id}
                day={d}
                setAvailTrue={setAvailTrue}
                setAvailFalse={setAvailFalse}
              />
            );
          })}
        </div>
      </div>
      <div className='p-3 w-full flex justify-end'>
        <Link href={'/days'}>
          <a className=' mt-5 p-5 bg-green-400 text-xl text-white font-bold hover:bg-green-500 rounded-3xl'>
            Set Hours
          </a>
        </Link>
      </div>
    </div>
  );
}
