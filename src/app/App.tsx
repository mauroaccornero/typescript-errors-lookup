import { useContext } from "react";
import { Layout } from "./components/Layout/components";
import { AppContext } from "./context/appContext";

import Detail from "./pages/Detail";
import Homepage from "./pages/Homepage";

const App = () => {
  const { state } = useContext(AppContext);

  return (
    <Layout>
      {state.errorDetailData === null ? <Homepage /> : <Detail />}
    </Layout>
  );
};

export default App;
