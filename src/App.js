import { useContext, useEffect, useCallback, useState } from 'react';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';

const App = () => {


  const [isLoading, setIsLoading] = useState(false);

  //fetches the data for the active wallet,based on the selected chain
  const fetchWalletData = useCallback(async () => {
    setIsLoading(true);
    

  })



  const userCtx = useContext(UserContext);
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
