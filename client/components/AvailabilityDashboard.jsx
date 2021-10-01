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
    <section className='w-11/12 lg:w-2/3 xl:w-1/3 my-10 md:p-8 bg-gray-100 rounded-md shadow-xl self-stretch'>
      <h3 className='text-xl md:text-2xl font-semibold p-3'>
        Set the days you are available
      </h3>
      <article className='flex justify-evenly'>
        <figure className='mt-5 w-full'>
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
        </figure>
      </article>
      <figure className='w-full flex justify-end'>
        <Link href={'/days'}>
          <a className='mt-5 p-3 md:p-5 bg-green-400 md:text-xl text-white font-bold hover:bg-green-500 rounded-2xl md:rounded-3xl'>
            Set Hours
          </a>
        </Link>
      </figure>
    </section>
  );
}
