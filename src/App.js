import { Fragment } from "react/cjs/react.production.min";
import classes from "./App.module.css";
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import UserProvider from './components/Context/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Main />
      <Footer />
    </UserProvider>
  );
};
export default App;
