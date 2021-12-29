import { useState, useContext } from 'react';
import classes from "./App.module.css";
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import UserProvider from './store/UserProvider';
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './store/UserContext';

const App = () => {
  const userCtx = useContext(UserContext);
  console.log(userCtx.isModalShowing)

  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar />
      <Main />
      <Footer />
    </>
  );

};
export default App;
