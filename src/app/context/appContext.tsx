import {
  Dispatch,
  ReactNode,
  useState,
  createContext,
  useEffect,
  useMemo,
} from "react";
import { IError, state } from "../../../common/types";
import findErrors from "../components/SearchBar/utils/findErrors";

interface AppContextInterface {
  results: IError[] | [];
  setSearchInput: Dispatch<string>;
  searchInput: string;
  state: state;
  page: number;
  setPage: Dispatch<number>;
}

const defaultContext: AppContextInterface = {} as AppContextInterface;

export const AppContext = createContext<AppContextInterface>(defaultContext);

interface IAppProviderProps {
  children: ReactNode;
  state: state;
}

export const AppProvider = ({ children, state }: IAppProviderProps) => {
  const [results, setResults] = useState<IError[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const memoizedSearch = useMemo(
    () => (searchInput ? findErrors(searchInput, state.errorsData) : []),
    [searchInput, state.errorsData]
  );

  useEffect(() => {
    setResults(memoizedSearch);
  }, [memoizedSearch]);

  return (
    <AppContext.Provider
      value={{
        results,
        setSearchInput,
        searchInput,
        state,
        page,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
