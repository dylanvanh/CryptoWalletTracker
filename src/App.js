import { useContext, useEffect, useState, useCallback } from 'react';
import classes from './App.module.css';
import Main from "./components/BodyDisplay/Main";
import Navbar from "./components/HeaderBar/Navbar/Navbar";
import AddWalletModal from "./components/HeaderBar/AddWalletModal/AddWalletModal";
import UserContext from './context/UserContext';
import Card from './components/UI/Card';

const App = () => {
  const userCtx = useContext(UserContext);

  //fetches token balances
  const [tokenData, setTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true);

  // const selectedWallet = '0xa9ac72E3BbD107eC40546Fc1C68c5e40fc7A9DD9';

  //displays the first wallet added as the default wallet on first load

  if (userCtx.wallets != null) {
    var selectedWallet;
    if (isFirstTimeLoad) {
      selectedWallet = userCtx.wallets[0];
      userCtx.selectWallet(selectedWallet);
      setIsFirstTimeLoad(false);
    } else {
      selectedWallet = userCtx.selectedWallet;
    }
  }

  const fetchWalletDataHandler = useCallback(async () => {
    //constants for searches
    const MORALIS_CHAIN_NAMES = {
      POLYGON: 'polygon',
      ETHEREUM: 'eth',
      AVALANCHE: 'avalanche',
    }

    const COINGECKO_CHAIN_NAMES = {
      POLYGON: 'polygon-pos',
      ETHEREUM: 'ethereum',
      AVALANCHE: 'avalanche'
    }

    const TYPE = {
      NATIVE_TOKEN: 'balance',
      ERC20: 'erc20',
    }

    var moralisSelectedChain = userCtx.selectedChain;
    var coinGeckoSelectedChain = userCtx.selectedChain;

    if (moralisSelectedChain === 'ethereum') {
      moralisSelectedChain = MORALIS_CHAIN_NAMES.ETHEREUM;
    };

    if (coinGeckoSelectedChain === 'polygon') {
      coinGeckoSelectedChain = COINGECKO_CHAIN_NAMES.POLYGON;
    };

    if (coinGeckoSelectedChain === 'eth') {
      coinGeckoSelectedChain = COINGECKO_CHAIN_NAMES.ETHEREUM;
    };

    const moralis_api_call_native = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.NATIVE_TOKEN}?chain=${moralisSelectedChain}`
    const moralis_api_call_erc20 = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.ERC20}?chain=${moralisSelectedChain}`

    const moralisApiHeader = {
      'accept': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
    }

    const geckoApiHeader = {
      'accept': 'application/json',
    }

    setIsLoading(true);
    setError(null);

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

      const api_prices = `https://api.coingecko.com/api/v3/simple/token_price/${coinGeckoSelectedChain}?contract_addresses=${combinedAddresses}&vs_currencies=usd&include_24hr_change=true`


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

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    userCtx.changeDataRetrievedStatus();
  }, [userCtx.selectedWallet, userCtx.selectedChain])



  useEffect(() => {

    //prevent api calls when no wallets added
    if (userCtx.wallets.length > 0) {
      fetchWalletDataHandler();
    }

  }, [fetchWalletDataHandler])

  let content = <h1>NO DATA FOUND!</h1>

  if (tokenData.length > 0) {
    content = <Main tokenData={tokenData} />
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
