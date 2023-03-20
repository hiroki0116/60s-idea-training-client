import Link from "next/link";

const HomePageFooter = () => {
  return (
    <footer className="text-center pt-10">
      <div className="flex flex-col">
        <div className="flex flex-row justify-center mb-1">
          <Link href="/" className="hover:animate-bounce">
            Home
          </Link>
          <div className="border-r mx-3" />
          <Link href="/about" className="hover:animate-bounce">
            About This Developer
          </Link>
        </div>
        <span className="italic">© 2022, 60seconds Idea Training.</span>
      </div>
    </footer>
  );
};

export default HomePageFooter;
