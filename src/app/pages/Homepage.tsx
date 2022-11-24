import Pagination from "../components/Pagination/Pagination";
import ItemsList from "../components/ItemsList/ItemsList";

const Homepage = () => {
  return (
    <>
      <Pagination />
      <ItemsList />
      <Pagination />
    </>
  );
};

export default Homepage;
