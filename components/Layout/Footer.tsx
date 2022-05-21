
const Footer = () => {

  return (
    <footer className='h-12 bg-slate-50'>
      <div className="flex justify-between px-20">
          <div className="italic">
            © 2021, 60seconds Idea Training.
          </div>
          <div className="flex flex-row gap-2">
            <a href='!#'>Home</a>
            <div className="border-l-2" />
            <a href='!#'>About this app</a>
          </div>
      </div>
    </footer>
  );
}

export default Footer;