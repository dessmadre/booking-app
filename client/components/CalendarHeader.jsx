export default function CalendarHeader({ dayDisplay }) {
  return (
    <section className=' my-5 flex justify-evenly self-baseline'>
      <h2 className='text-2xl  md:text-3xl font-semibold text-center'>
        {dayDisplay}
      </h2>
    </section>
  );
}
