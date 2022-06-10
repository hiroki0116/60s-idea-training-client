import Link from 'next/link';

const Footer = () => {

  return (
    <footer className='h-12 bg-slate-50'>
      <div className="flex flex-col text-center">
          <div className="flex flex-row justify-center mb-1">
            <Link href='/dashboard'><a className="hover:animate-bounce">Home</a></Link>
            <div className="border-r mx-3"/>
            <Link href='/dashboard'><a className="hover:animate-bounce">About this app</a></Link>
          </div>
            <span className="italic">© 2021, 60seconds Idea Training.</span>
      </div>
    </footer>
  );
}

export default Footer;