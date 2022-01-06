import { useContext, useEffect, useState, useCallback } from 'react';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import Footer from "./components/FooterBar/Footer";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import TokenList from './components/BodyDisplay/Portfolio/TokenList';

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

  //fetches token balances
  const nativeData = undefined;
  const erc20Data = undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataRetrived, setDataRetrieved] = useState(false);


  console.log('main data fetched(1) = ', userCtx.isDataFetched)

  const fetchWalletDataHandler = useCallback(async (nativeData, erc20Data) => {
    setIsLoading(true);
    setError(null);

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
      nativeData = await responseErc20.json();
      erc20Data = await responseNative.json();
      console.log('ue = ', nativeData)
      console.log('ue = ', erc20Data)

    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false);
    setDataRetrieved(true);

    userCtx.changeDataRetrievedStatus();
    console.log('main data fetched(2) = ', userCtx.isDataFetched)
  }, [])


  //for testing make this when the wallet button is clicked
  useEffect(() => {
    fetchWalletDataHandler();
  }, [fetchWalletDataHandler])

  let content = <h1>NO DATA FOUND!</h1>

  // if (nativeData.length > 0){
  //   content = <TokenList></TokenList>
  // }

  if(error){
    content = <h1>AN ERROR HAS OCCURED!</h1>
  }

  if(isLoading){
    content = <h2>Loading...</h2>;
  }

  return (
    <>
      {userCtx.isModalShowing && <AddWalletModal />}
      <Navbar />
      <div>
        {content}
      </div>
      <Main />
      <Footer />
    </>
  );


};
export default App;
