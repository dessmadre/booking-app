export default function DashBoardLayout({ children }) {
  return (
    <div className='w-11/12 md:w-4/5 flex justify-center mx-auto'>
      {children}
    </div>
  );
}
