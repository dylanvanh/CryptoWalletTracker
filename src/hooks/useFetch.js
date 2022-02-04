import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

const useFetch = () => {
  const [tokenData, setTokenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const userCtx = useContext(UserContext);

  //constants for api parameters
  const MORALIS_CHAIN_NAMES = {
    ethereum: "eth",
    polygon: "polygon",
    avalanche: "avalanche",
  };
  const COINGECKO_ERC20_CHAIN_NAMES = {
    ethereum: "ethereum",
    polygon: "polygon-pos",
    avalanche: "avalanche",
  };
  const COINGECKO_NATIVE_CHAIN_NAMES = {
    ethereum: "ethereum",
    polygon: "matic-network",
    avalanche: "avalanche-2",
  };
  const NATIVE_TOKEN_NAMES = {
    ethereum: "Ethereum",
    polygon: "Matic",
    avalanche: "Avax",
  };
  const TYPE = {
    NATIVE_TOKEN: "balance",
    ERC20: "erc20",
  };
  const USERCONTEXT_AVAILABLE_CHAINS = {
    ETHEREUM: "ethereum",
    POLYGON: "polygon",
    AVALANCHE: "avalanche",
    ALL_AVAILABLE: "all",
  };

  const MORALIS_API_HEADER = {
    accept: "application/json",
    "X-API-Key": `${process.env.REACT_APP_X_API_KEY}`,
  };

  const COINGECKO_API_HEADER = {
    accept: "application/json",
  };

  const fetchSingleChainDataHandler = async () => {
    const moralis_api_call_native = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.NATIVE_TOKEN}?chain=${MORALIS_CHAIN_NAMES[userCtx.selectedChain]}`;

    const moralis_api_call_erc20 = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.ERC20}?chain=${MORALIS_CHAIN_NAMES[userCtx.selectedChain]}`;

    const coingecko_api_native_prices = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${
      COINGECKO_NATIVE_CHAIN_NAMES[userCtx.selectedChain]
    }%2C&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;

    setIsLoading(true);
    setError(false);

    try {
      const responseNativeBalance = await fetch(moralis_api_call_native, {
        headers: MORALIS_API_HEADER,
      });

      const responseErc20 = await fetch(moralis_api_call_erc20, {
        headers: MORALIS_API_HEADER,
      });

      const responseNativePrice = await fetch(coingecko_api_native_prices, {
        headers: COINGECKO_API_HEADER,
      });

      if (!responseErc20.ok) {
        throw new Error("Error fetching token data");
      }

      //swap around the native and erc20 -> wrong (not changing now due to a different bug)
      const erc20Data = await responseErc20.json();
      const nativeBalanceData = await responseNativeBalance.json();
      const nativePrices = await responseNativePrice.json();

      //converts fetched tokenData data into improved format
      const transformedErc20TokenData = erc20Data.map((tokenData) => {
        return {
          tokenAddress: tokenData.token_address,
          name: tokenData.name,
          balance: tokenData.balance,
          decimals: tokenData.decimals,
          symbol: tokenData.symbol,
          price: null,
          dayChange: null,
          totalValue: null,
          chain: userCtx.selectedChain,
        };
      });

      //handles fetching prices for the different tokens fetched
      //allows filtering out the spam tokens (ones without prices)
      const addresses = transformedErc20TokenData.map(
        (token) => token.tokenAddress
      );
      const combinedAddresses = addresses.join("%2C");

      const api_prices = `https://api.coingecko.com/api/v3/simple/token_price/${
        COINGECKO_ERC20_CHAIN_NAMES[userCtx.selectedChain]
      }?contract_addresses=${combinedAddresses}&vs_currencies=usd&include_24hr_change=true`;

      const responsePrices = await fetch(api_prices, {
        headers: COINGECKO_API_HEADER,
      });

      const erc20PriceData = await responsePrices.json();

      //converts fetched price data into improved format
      const erc20ConvertedPrices = Object.entries(erc20PriceData);
      const erc20NewPrices = erc20ConvertedPrices.map((data) => {
        return {
          tokenAddress: data[0],
          price: data[1]["usd"],
          change: data[1]["usd_24h_change"],
        };
      });

      //adds the price,24hourchange in price to data
      transformedErc20TokenData.forEach((tokenData) => {
        let foundAddress = erc20NewPrices.find(
          (priceData) => priceData.tokenAddress === tokenData.tokenAddress
        );
        if (foundAddress !== undefined) {
          tokenData.price = foundAddress["price"];
          tokenData.dayChange = foundAddress["change"];
        }
      });

      //combine the native price and balance data into 1 object
      const convertNativeData = (nativePrices, nativeBalanceData) => {
        const updatedNativeData = {};

        updatedNativeData.token_address = "NATIVE_TOKEN";
        updatedNativeData.name = NATIVE_TOKEN_NAMES[userCtx.selectedChain];
        updatedNativeData.balance = nativeBalanceData.balance;
        updatedNativeData.decimals = 18;
        updatedNativeData.symbol = userCtx.selectedChain;
        updatedNativeData.price = nativePrices.current_price;
        updatedNativeData.totalValue = null;
        updatedNativeData.chain = userCtx.selectedChain;

        return updatedNativeData;
      };

      if (nativeBalanceData.balance != 0) {
        const convertedNativeData = convertNativeData(
          nativePrices[0],
          nativeBalanceData
        );
        //insert the native token object at the beginning of array of objects
        transformedErc20TokenData.unshift(convertedNativeData);
      }
      //stores data into state variable
      setTokenData(transformedErc20TokenData);
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  };

  const fetchMultiChainDataHandler = async () => {
    //CHAIN - ETH
    const eth_native = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.NATIVE_TOKEN}?chain=${MORALIS_CHAIN_NAMES.ETHEREUM}`;

    const eth_erc20 = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.ERC20}?chain=${MORALIS_CHAIN_NAMES.ETHEREUM}`;

    const eth_native_price = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${
      COINGECKO_NATIVE_CHAIN_NAMES.ETHEREUM
    }%2C&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;

    //CHAIN - POLYGON
    const polygon_native = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.NATIVE_TOKEN}?chain=${MORALIS_CHAIN_NAMES.POLYGON}`;

    const polygon_erc20 = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.ERC20}?chain=${MORALIS_CHAIN_NAMES.POLYGON}`;

    const polygon_native_price = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${
      COINGECKO_NATIVE_CHAIN_NAMES.POLYGON
    }%2C&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;

    //CHAIN - AVALANCHE
    const avalanche_native = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.NATIVE_TOKEN}?chain=${MORALIS_CHAIN_NAMES.AVALANCHE}`;

    const avalanche_erc20 = `https://deep-index.moralis.io/api/v2/${
      userCtx.selectedWallet
    }/${TYPE.ERC20}?chain=${MORALIS_CHAIN_NAMES.AVALANCHE}`;

    const avalanche_native_price = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${
      COINGECKO_NATIVE_CHAIN_NAMES.AVALANCHE
    }%2C&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
  };

  useEffect(() => {
    if (userCtx.selectedChain !== USERCONTEXT_AVAILABLE_CHAINS.ALL_AVAILABLE) {
      fetchSingleChainDataHandler();
    } else {
      fetchMultiChainDataHandler();
    }
  }, [userCtx.selectedWallet, userCtx.selectedChain]);

  return {
    tokenData,
    isLoading,
    error,
  };
};

export default useFetch;
