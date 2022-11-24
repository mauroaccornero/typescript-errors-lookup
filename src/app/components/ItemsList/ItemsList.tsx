import { useContext, useMemo } from "react";
import { AppContext } from "../../context/appContext";
import { ITEMS_PER_PAGE } from "../../common/constants";
import ItemCard from "../ItemCard/ItemCard";

const ItemsList = () => {
  const {
    state: { errorsData },
    page,
  } = useContext(AppContext);

  const items = useMemo(() => {
    const startItemIndex = page === 1 ? 0 : page * ITEMS_PER_PAGE;
    const endItemIndex = startItemIndex + ITEMS_PER_PAGE - 1;
    return errorsData.slice(startItemIndex, endItemIndex);
  }, [page, errorsData]);

  return (
    <>
      {items.map((m) => (
        <ItemCard data={m} key={m[0] + "-s"} />
      ))}
    </>
  );
};

export default ItemsList;
