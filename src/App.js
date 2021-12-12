import "./App.css";
import { Fragment } from 'react'
import Header from "./components/HeaderBar/Header"

function App() {
  return (
    <Fragment>
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <Header />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
