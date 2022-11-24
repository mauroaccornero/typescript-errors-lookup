import { StrictMode } from "react";
import { state } from "../../common/types";
import { AppProvider } from "./context/appContext";
import App from "./App";

export interface IPageSwitcherProps {
  state: state;
}

const AppWithProvider = ({ state }: IPageSwitcherProps) => {
  return (
    <StrictMode>
      <AppProvider state={state}>
        <App />
      </AppProvider>
    </StrictMode>
  );
};

export default AppWithProvider;
