export default function CalendarHeader({ dayDisplay }) {
  return (
    <div className='my-5 flex w-full justify-evenly self-baseline'>
      <h2 className='text-3xl font-semiboldtext-center'>{dayDisplay}</h2>
    </div>
  );
}
