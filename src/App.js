import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import TokenList from './components/BodyDisplay/Portfolio/TokenList';
import Card from './components/UI/Card';

const App = () => {
  const userCtx = useContext(UserContext);

  //temp wallet for testing
  const selectedWallet = '0x6404331b77E488a314A9092d737F5ADE1CB9fBAf'

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

  //fetches token balances
  const [tokenData, setTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  // console.log('main data fetched(1) = ', userCtx.isDataFetched)

  const fetchWalletDataHandler = useCallback(async (nativeData, erc20Data) => {
    setIsLoading(true);
    setError(null);
    console.log('fetchwalletdatahandler!')

    try {
      const responseErc20 = await fetch(api_call_native, {
        headers: apiHeaders,
      });

      const responseNative = await fetch(api_call_erc20, {
        headers: apiHeaders,
      });

      if (!responseErc20.ok) {
        throw new Error('Error fetching token data')
      }

      //native token data
      const nativeData = await responseErc20.json();
      const erc20Data = await responseNative.json();
      console.log('ue = ', nativeData)
      console.log('ue = ', erc20Data);

      const transformedTokenData = erc20Data.map((tokenData) => {
        return {
          tokenAddress: tokenData.token_address,
          name: tokenData.name,
          balance: tokenData.balance,
          decimals: tokenData.decimals,
          symbol: tokenData.symbol,
        };
      });

      setTokenData(transformedTokenData)
      console.log('transformed data = ', transformedTokenData);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    userCtx.changeDataRetrievedStatus();
    // console.log('main data fetched(2) = ', userCtx.isDataFetched)
  }, [])


  //for testing make this when the wallet button is clicked
  useEffect(() => {
    fetchWalletDataHandler();
  }, [fetchWalletDataHandler])

  let content = <h1>NO DATA FOUND!</h1>

  if (tokenData.length > 0) {
    content = <Main tokenData={tokenData} />
  }


  if (error) {
    content = <h1>AN ERROR HAS OCCURED!</h1>
    console.log(error)
  }

  if (isLoading) {
    content = <Card><h1 className={classes.loading}>Loading...</h1></Card>;
  }

  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar fetchData={fetchWalletDataHandler} />
      {content}
      {/* <Footer /> */}
    </>
  );

};
export default App;
