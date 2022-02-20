import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Header from "./components/HeaderBar/Header/Header.js";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import Card from './components/UI/Card';
import useFetchTokenData from './hooks/useFetchTokenData';
import useFetchCurrencyData from './hooks/useFetchCurrencyData';


const App = () => {

  const [isMetaMaskInstalled, setisMetaMaskInstalled] = useState(false);

  const { tokenData, isLoading, error } = useFetchTokenData();
  const {currencyData} = useFetchCurrencyData();
  // const currencyData = [];

  
  const userCtx = useContext(UserContext);


  // console.log(currencyData);
  console.log(tokenData);

  useEffect(() => {
    const checkForMetaMask = () => {
      if (typeof window.ethereum !== 'undefined') {
        setisMetaMaskInstalled(true);
      } else {
        console.log('MetaMask is not installed!');
      }
    }
    checkForMetaMask();
  })

  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Header metaMaskStatus={isMetaMaskInstalled} currencyData={currencyData} />
      {!userCtx.selectedWallet && <Card><h1>NO WALLET SELECTED</h1></Card>}
      {userCtx.selectedWallet && <div>
        {isLoading && <Card><h1 className={classes.loading}>Loading...</h1></Card>}
        {error && <h1>Error encountered</h1>}
        {!isLoading && <Main tokenData={tokenData}  />}
      </div>}
    </>
  );

};
export default App;
