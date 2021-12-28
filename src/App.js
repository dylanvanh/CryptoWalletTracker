import { Fragment } from "react/cjs/react.production.min";
import classes from "./App.module.css";
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";


const App = () => {
  return (
    <div className={classes.container}>
      <Navbar/>
      <Main/>
      <Footer/>
    </div>
  );
};
export default App;
