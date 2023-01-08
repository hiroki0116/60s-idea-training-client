import Link from 'next/link';

const Footer = () => {

  return (
    <footer className='text-center pt-10'>
      <div className="flex flex-col">
          <div className="flex flex-row justify-center mb-1">
            <Link href='/'><a className="hover:animate-bounce dark:text-green-300">Home</a></Link>
            <div className="border-r mx-3"/>
            <Link href='/about'><a className="hover:animate-bounce dark:text-green-300">About This Developer</a></Link>
          </div>
          <span className="italic">© 2022, 60seconds Idea Training.</span>
      </div>
    </footer>
  );
}

export default Footer;