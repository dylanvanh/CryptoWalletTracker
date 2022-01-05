import { useContext, useEffect, useState } from 'react';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';

const App = () => {

  const userCtx = useContext(UserContext);

  //temp wallet for testing
  const selectedWallet = '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e'

  //constants for searches
  const CHAIN_NAMES = {
    POLYGON: 'polygon',
    ETHEREUM: 'eth',
    AVALANCHE: 'avalanche',
  }
  const TYPE = {
    NATIVE_TOKEN: 'balance',
    ERC20: 'erc20',
  }

  //ERC20
  const api_call_native = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.NATIVE_TOKEN}?chain=${CHAIN_NAMES.POLYGON}`
  const api_call_erc20 = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.ERC20}?chain=${CHAIN_NAMES.POLYGON}`

  const apiHeaders = {
    'accept': 'application/json',
    'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
  }

  //fetches erc20 token data
  useEffect(async () => {
    //erc20 token data
    const responseNative = await fetch(api_call_erc20, {
      headers: apiHeaders,
    });

    const er20Data = await responseNative.json();
    console.log(er20Data)

    //native token data
    const response = await fetch(api_call_native, {
      headers: apiHeaders,
    });

    const nativeData = await response.json();
    console.log(nativeData)
  }, []);


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
