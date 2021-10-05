import { useContext, useState } from 'react';
import BookingContext from '../../context/booking/bookingContext';

export default function BookingDashboard({ bookings }) {
  const bookingContext = useContext(BookingContext);
  const { deleteBooking } = bookingContext;

  return (
    <section className='w-5/6 md:w-2/3 my-10 p-5 md:p-8 bg-gray-100 rounded-md shadow-xl'>
      <h2 className='px-3 mt-5 text-3xl font-bold'>Bookings</h2>
      {!bookings.length && (
        <p className='p-3'>
          You currently have no bookings, set up your calendar to start getting
          booked
        </p>
      )}
      {bookings.map((b) => {
        const [isDelete, setIsDelete] = useState(false);
        const deleteABooking = async (id) => {
          try {
            deleteBooking(id);
            setIsDelete(false);
          } catch (err) {
            console.log(err);
          }
        };
        return (
          <figure
            key={b._id}
            className='my-4 px-3 py-1 flex justify-between items-center'
          >
            <section>
              <h3 className='md:text-xl font-semibold'>{b.dateString}</h3>
              <p className='text-xs md:text-lg'>
                {b.weekday} @ {b.hour}
              </p>
            </section>
            <section className='flex'>
              <button
                className={`bg-red-400 px-3 p-1 md:text-xl rounded-2xl ${
                  isDelete ? 'hidden' : ''
                }`}
                onClick={() => setIsDelete(true)}
              >
                Delete
              </button>
              {isDelete && (
                <>
                  <button
                    className='bg-red-400 px-2 p-1 rounded-2xl mr-2'
                    onClick={() => setIsDelete(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='bg-blue-400 px-2 p-1 rounded-2xl'
                    onClick={() => deleteABooking(b._id)}
                  >
                    Confirm
                  </button>
                </>
              )}
            </section>
          </figure>
        );
      })}
    </section>
  );
}
