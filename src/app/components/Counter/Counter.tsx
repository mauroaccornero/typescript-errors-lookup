import { useContext, useMemo } from "react";
import { AppContext } from "../../context/appContext";

const Counter = () => {
  const {
    state: { errorsData, errorCategories, errorTags },
  } = useContext(AppContext);

  const counterMessage = useMemo(() => {
    let counterMessage = "Search among ";
    counterMessage += errorCategories.reduce(
      (counterMessage, category, categoryIndex) => {
        const count = errorsData.reduce(
          (total, x) => (x[2] === categoryIndex ? total + 1 : total),
          0
        );
        counterMessage += `${count} ${category}s`;
        if (categoryIndex === 0) {
          counterMessage += ", ";
        }
        if (categoryIndex === 1) {
          counterMessage += " and ";
        }
        return counterMessage;
      },
      ""
    );

    return (
      counterMessage + ` in last ${errorTags ? errorTags.length : 0} versions`
    );
  }, [errorsData, errorCategories, errorTags]);

  return <small>{counterMessage}</small>;
};

export default Counter;
