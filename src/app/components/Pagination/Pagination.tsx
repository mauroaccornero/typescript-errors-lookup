import { useContext, useMemo } from "react";
import { AppContext } from "../../context/appContext";
import { ITEMS_PER_PAGE } from "../../common/constants";

export const Pagination = () => {
  const {
    state: { errorsData },
    setPage,
    page,
  } = useContext(AppContext);

  const pages = useMemo(() => {
    const totalPages = Math.floor(errorsData.length / ITEMS_PER_PAGE);
    return Array.from({ length: totalPages }, (v, i) => i + 1);
  }, [errorsData]);

  return (
    <ul className="my-3 flex flex-wrap justify-center">
      {pages.map((p) => {
        const isActive = p.toString() === page.toString();
        return (
          <li
            key={p + "page-link"}
            className={`m-1 w-8 p-1 text-center text-xs underline ${
              isActive ? "font-bold" : "hover:underline"
            }`}
          >
            <button onClick={() => setPage(p)} disabled={isActive}>
              {p}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
