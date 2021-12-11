import "./App.css";
import { Fragment } from 'react'
import OverviewForm from "./components/OverviewDisplay/OverviewForm";
import SearchBar from "./components/WalletSelectors/SearchBar";

function App() {
  return (
    <Fragment>
      <SearchBar />
      <OverviewForm />
    </Fragment>
  );
}

export default App;
