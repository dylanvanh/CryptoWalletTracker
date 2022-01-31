import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import Card from './components/UI/Card';
import useFetch from './hooks/useFetch';

const App = () => {
  const userCtx = useContext(UserContext);

  //fetches token balances
  // const [erc20TokenData, setErc20TokenData] = useState([]);
  // const [nativeTokenData,setNativeTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true);

  // const selectedWallet = '0xa9ac72E3BbD107eC40546Fc1C68c5e40fc7A9DD9';

  //displays the first wallet added as the default wallet on first load

  var selectedWallet = null;

  if (userCtx.wallets != null) {
    if (isFirstTimeLoad) {
      selectedWallet = userCtx.wallets[0];
      userCtx.selectWallet(selectedWallet);
      setIsFirstTimeLoad(false);
    } else {
      selectedWallet = userCtx.selectedWallet;
    }
  }

  const selectedChain = userCtx.selectedChain;

  //SELECTED WALLET IS GIVING NULL!
  const { erc20TokenData, nativeTokenData } = useFetch(selectedWallet, selectedChain);
  
  
  let content = <h1>NO DATA FOUND!</h1>

  if (erc20TokenData.length > 0) {
    content = <Main erc20TokenData={erc20TokenData} nativeTokenData={nativeTokenData} />
  }


  if (error) {
    content = <h1>AN ERROR HAS OCCURED!</h1>

    if (userCtx.wallets != null) {
      content = <h1>No added wallets</h1>
    }
  }

  if (isLoading) {
    content = <Card><h1 className={classes.loading}>Loading...</h1></Card>;
  }

  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar />
      {content}
    </>
  );

};
export default App;
