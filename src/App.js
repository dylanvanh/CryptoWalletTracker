import { Fragment } from "react/cjs/react.production.min";
import classes from "./App.module.css";
import Main from "./components/BodyDisplay/Main";
import Header from "./components/HeaderBar/Header";
import Footer from "./components/FooterBar/Footer";


const App = () => {
  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <Main className={classes.main} />
      <Footer className={classes.footer} />
    </div>
  );
};
export default App;
