import { Link } from "../../components";

const Footer = () => {
  return (
    <footer className="mt-auto bg-black p-2 text-center text-xs text-white">
      <Link
        target="_blank"
        link="https://github.com/mauroaccornero/typescript-errors-lookup"
      >
        Check the code on GitHub
      </Link>
    </footer>
  );
};

export default Footer;
