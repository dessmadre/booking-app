export default function DashBoardLayout({ children }) {
  return (
    <div className='flex flex-col items-center justify-around flex-1'>
      {children}
    </div>
  );
}
