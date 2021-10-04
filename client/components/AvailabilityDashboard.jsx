import Link from 'next/link';
import AvailabilitySetter from './AvailbilitySetter';

export default function AvailabilityDashboard({ days }) {
  return (
    <section className='w-5/6 md:w-2/3 my-10 md:p-8 bg-gray-100 rounded-md shadow-xl'>
      <h3 className='text-xl md:text-2xl font-semibold p-3'>
        Set the days you are available
      </h3>
      <article className='flex justify-evenly'>
        <figure className='mt-5 w-full'>
          {days.map((d) => {
            return <AvailabilitySetter key={d._id} day={d} />;
          })}
        </figure>
      </article>
      <figure className='w-full flex justify-end p-4'>
        <Link href={'/days'}>
          <a className='mt-5 p-3 md:p-5 bg-green-400 md:text-xl text-white font-bold hover:bg-green-500 rounded-2xl md:rounded-3xl'>
            Set Hours
          </a>
        </Link>
      </figure>
    </section>
  );
}
