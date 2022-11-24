import { Link } from "../../components";
import { HOMEPAGE_PATH } from "../../../../common/constants";
import Counter from "../../../Counter/Counter";
import SearchBar from "../../../SearchBar/SearchBar";

const Header = () => {
  return (
    <header className="p-3">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 text-left">
        <h1 className="mb-3 text-2xl font-light">
          <Link path={HOMEPAGE_PATH} className="hover:underline">
            Typescript Errors Lookup
          </Link>
        </h1>
        <Counter />
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
