import { IError } from "../../../../common/types";
import { useContext, useMemo } from "react";
import { AppContext } from "../../context/appContext";
import { Card, Link } from "../Layout/components";
import { ERROR_PATH } from "../../common/constants";

interface IItemCardProps {
  data: IError;
}

const ItemCard = ({ data }: IItemCardProps) => {
  const {
    state: { errorTags, errorCategories },
  } = useContext(AppContext);

  const { code, message, category, tags } = useMemo(() => {
    const [code, message, categoryIndex, tagsIndexes] = data;
    const tags = tagsIndexes.map((i) => errorTags[i]);
    const category = errorCategories[categoryIndex];
    return { code, message, category, tags };
  }, [data, errorTags, errorCategories]);

  return (
    <Card>
      <Link path={`${ERROR_PATH}/${code}.html`}>
        <h3 className="mb-3 font-bold hover:underline">
          TS{code} - {message}
        </h3>
        <p className="mb-3">
          <strong>Category:</strong> {category}
        </p>
        <small className="text-slate-800">
          <strong>Present in versions:</strong> {tags.join(",")}
        </small>
      </Link>
    </Card>
  );
};

export default ItemCard;
