import { Fragment } from "react/cjs/react.production.min";
import classes from "./App.module.css";
import Main from "./components/BodyDisplay/Main";
import Header from "./components/HeaderBar/Header";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};
export default App;
