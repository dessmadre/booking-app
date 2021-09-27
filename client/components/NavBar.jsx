import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='flex justify-end p-3 text-xl font-semibold'>
      <Link href={'/'}>
        <a className='mr-4 hover:text-blue-400'>Calendar</a>
      </Link>
      <Link href={'/dashboard'}>
        <a className='hover:text-blue-400'>Dashboard</a>
      </Link>
    </nav>
  );
}
