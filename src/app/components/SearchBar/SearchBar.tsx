import { ChangeEvent, useContext } from "react";
import { AppContext } from "../../context/appContext";
import { HiSearch } from "react-icons/hi";
import { Link } from "../Layout/components";
import { ERROR_PATH } from "../../common/constants";

const SearchBar = () => {
  const { setSearchInput, searchInput, setPage, results } =
    useContext(AppContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  return (
    <div className="my-5 flex w-full items-center justify-between rounded bg-slate-200 shadow">
      <div className="relative w-full">
        <input
          className="w-full rounded bg-slate-200 p-5 text-sm text-slate-900"
          type="text"
          placeholder="Search by error message or code"
          value={searchInput}
          onChange={(e) => handleChange(e)}
        />{" "}
        {results.length > 0 && (
          <ul className="top-15 absolute left-0 z-10 w-full rounded bg-slate-200 text-slate-900 shadow">
            {results.map((m) => {
              return (
                <li key={m[0] + "- search-result"}>
                  <Link
                    className="mb-1 px-2 py-3 text-xs text-slate-900 hover:underline"
                    key={`sr-${m[0]}`}
                    path={`${ERROR_PATH}/${m[0]}.html`}
                  >
                    TS{m[0]} - {m[1]}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <HiSearch className="w-auto fill-slate-500 px-5" />
    </div>
  );
};

export default SearchBar;
