export function FullDay({ day, onClick }) {
  return (
    <div
      className={`day  border-2 border-black ${
        day.isAvailable ? 'bg-green-100' : 'bg-red-200'
      }`}
      key={day.id}
      onClick={onClick}
    >
      <p className='font-bold'>{day.hour}</p>
      {day.event && (
        <div className='text-xs bg-blue-300 rounded-md p-1'>
          {day.event.title}
        </div>
      )}
    </div>
  );
}
