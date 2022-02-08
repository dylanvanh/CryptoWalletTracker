import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import Card from './components/UI/Card';
import useFetch from './hooks/useFetch';

const App = () => {

  const [isMetaMaskInstalled, setisMetaMaskInstalled] = useState(false);

  const { tokenData, isLoading, error } = useFetch();

  const userCtx = useContext(UserContext);

  useEffect(() => {
    const checkForMetaMask = () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        setisMetaMaskInstalled(true);
      } else {
        console.log('MetaMask is not installed!');
      }
    }

    checkForMetaMask()
  })

  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar metaMaskStatus={isMetaMaskInstalled} />
      {!userCtx.selectedWallet && <Card><h1>NO WALLET SELECTED</h1></Card>}
      {userCtx.selectedWallet && <div>
        {isLoading && <Card><h1 className={classes.loading}>Loading...</h1></Card>}
        {error && <h1>Error encountered</h1>}
        {!isLoading && <Main tokenData={tokenData} />}
      </div>}
    </>
  );

};
export default App;
