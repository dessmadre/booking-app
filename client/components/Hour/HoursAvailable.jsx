import HourSetter from './HourSetter';

export default function HoursAvailable({ days }) {
  return days.map((d) => {
    return (
      <div className='my-10 w-11/12' key={d._id}>
        <p className='text-3xl font-semibold'>{d.day}s</p>
        <div className='bg-white flex flex-wrap justify-evenly p-1 mt-5 rounded-lg shadow-lg'>
          {d.hours.map((h) => {
            return <HourSetter key={h._id} hour={h} />;
          })}
        </div>
      </div>
    );
  });
}
