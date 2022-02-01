import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

const useFetch = () => {

  const [erc20TokenData, setErc20TokenData] = useState([]);
  const [nativeTokenData, setNativeTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true);
  const [error, setError] = useState(false)

  const userCtx = useContext(UserContext);

  const fetchWalletDataHandler = async () => {


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

    const moralis_api_call_native = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.NATIVE_TOKEN}?chain=${moralisSelectedChain}`
    const moralis_api_call_erc20 = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.ERC20}?chain=${moralisSelectedChain}`

    const moralisApiHeader = {
      'accept': 'application/json',
      'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
    }

    const geckoApiHeader = {
      'accept': 'application/json',
    }

    setIsLoading(true);
    setError(false);
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


      console.log(erc20Data)


      setNativeTokenData(nativeData);

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

      console.log('prices', api_prices)

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
        if (foundAddress !== undefined) {
          tokenData.price = foundAddress['price'];
          tokenData.dayChange = foundAddress['change'];
        }
      });

      //stores data into state variable
      setErc20TokenData(transformedTokenData)

    } catch (err) {
      console.log('err = ', err)
      setError(true);
    }
    setIsLoading(false);
  }


  useEffect(() => {
    fetchWalletDataHandler()
  }, [userCtx.selectedWallet, userCtx.selectedChain])

  return {
    erc20TokenData: erc20TokenData,
    nativeTokenData: nativeTokenData,
    isLoading: isLoading,

  }

}

export default useFetch;