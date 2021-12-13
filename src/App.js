import "./App.css";
import { Fragment } from 'react'
import Header from "./components/HeaderBar/Header"
import MainDisplay from "./components/BodyDisplay/MainDisplay";

function App() {
  return (
    <Fragment>
      <Header/>
      <MainDisplay/>
    </Fragment>
  );
}

export default App;
