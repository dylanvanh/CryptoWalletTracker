import { useContext, useEffect, useCallback, useState } from 'react';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import useRetrieveData from './hooks/use-retrieveData';

const App = () => {

  const userCtx = useContext(UserContext);


  //retreive the data on app startup for the user 
  const { data, isLoading, error } = useRetrieveData(userCtx.selectedWallet);


  console.log('data =', data);
  console.log('isLoading =', isLoading);
  console.log('error =', error);


  return (
    <>
      <Navbar />
      <Main />
      <Footer />
    </>
  );

};
export default App;
