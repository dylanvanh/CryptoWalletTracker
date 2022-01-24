import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import Card from './components/UI/Card';

const App = () => {
  console.log('app loading')
  const userCtx = useContext(UserContext);

  //fetches token balances
  const [tokenData, setTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true);

  // const selectedWallet = '0xa9ac72E3BbD107eC40546Fc1C68c5e40fc7A9DD9';

  //displays the first wallet added as the default wallet on first load
  var selectedWallet;
  if (isFirstTimeLoad) {
    selectedWallet = userCtx.wallets[0];
    userCtx.selectWallet(selectedWallet);
  } else {
    selectedWallet = userCtx.selectedWallet;
  }

  const fetchWalletDataHandler = useCallback(async () => {
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

    const moralis_api_call_native = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.NATIVE_TOKEN}?chain=${CHAIN_NAMES.POLYGON}`
    const moralis_api_call_erc20 = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.ERC20}?chain=${CHAIN_NAMES.POLYGON}`
    
    const moralisApiHeader = {
      'accept': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
    }
    
    const geckoApiHeader = {
      'accept': 'application/json',
    }

    setIsLoading(true);
    setError(null);
    console.log('fetchwalletdatahandler!')

    try {
      const responseNative = await fetch(moralis_api_call_native, {
        headers: moralisApiHeader,
      });

      const responseErc20 = await fetch(moralis_api_call_erc20, {
        headers: moralisApiHeader,
      });

      if (!responseErc20.ok) {
        throw new Error('Error fetching token data')
      }

      //swap around the native and erc20 -> wrong (not changing now due to a different bug)
      const erc20Data = await responseErc20.json();
      const nativeData = await responseNative.json();
      console.log('ue = ', erc20Data);
      console.log('ue = ', nativeData)

      //converts fetched tokenData data into improved format
      const transformedTokenData = erc20Data.map((tokenData) => {
        return {
          tokenAddress: tokenData.token_address,
          name: tokenData.name,
          balance: tokenData.balance,
          decimals: tokenData.decimals,
          symbol: tokenData.symbol,
          price: null,
          dayChange: null,
          totalValue: null,
        };
      });

      //handles fetching prices for the different balances fetched
      //allows filtering out the spam tokens (ones without values)
      const addresses = transformedTokenData.map(
        token => token.tokenAddress
      );
      const combinedAddresses = addresses.join('%2C')
      const api_prices = `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${combinedAddresses}&vs_currencies=usd&include_24hr_change=true`

      const responsePrices = await fetch(api_prices, {
        headers: geckoApiHeader,
      });

      const priceData = await responsePrices.json();

      //converts fetched price data into improved format
      const convertedPrices = Object.entries(priceData)
      const newPrices = convertedPrices.map((data) => {
        return {
          tokenAddress: data[0],
          price: data[1]['usd'],
          change: data[1]['usd_24h_change'],
        }
      })

      //adds the price,24hourchange in price to data
      transformedTokenData.forEach((tokenData) => {
        let foundAddress = newPrices.find((priceData) => priceData.tokenAddress === tokenData.tokenAddress)
        if (foundAddress != undefined) {
          tokenData.price = foundAddress['price'];
          tokenData.dayChange = foundAddress['change'];
        }
      });

      //stores data into state variable
      setTokenData(transformedTokenData)
      console.log('ttd', transformedTokenData)

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    userCtx.changeDataRetrievedStatus();
  }, [userCtx.selectedWallet])


  //for testing make this when the wallet button is clicked
  useEffect(() => {
    fetchWalletDataHandler();

    //change first time load to false
    setIsFirstTimeLoad(false);
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
      <Navbar/>
      {content}
      {/* <Footer /> */}
    </>
  );

};
export default App;
