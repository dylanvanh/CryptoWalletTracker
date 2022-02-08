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
    native_token: "balance",
    erc20: "erc20",
  };
  const USERCONTEXT_AVAILABLE_CHAINS = {
    ethereum: "ethereum",
    polygon: "polygon",
    avalanche: "avalanche",
    all_available: "all",
  };

  const MORALIS_API_HEADER = {
    accept: "application/json",
    "X-API-Key": `${process.env.REACT_APP_X_API_KEY}`,
  };

  const COINGECKO_API_HEADER = {
    accept: "application/json",
  };

  const fetchSingleChainDataHandler = async () => {
    const moralis_api_call_native = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet
      }/${TYPE.native_token}?chain=${MORALIS_CHAIN_NAMES[userCtx.selectedChain]}`;

    const moralis_api_call_erc20 = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet
      }/${TYPE.erc20}?chain=${MORALIS_CHAIN_NAMES[userCtx.selectedChain]}`;

    const coingecko_api_native_prices = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINGECKO_NATIVE_CHAIN_NAMES[userCtx.selectedChain]
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

      const api_prices = `https://api.coingecko.com/api/v3/simple/token_price/${COINGECKO_ERC20_CHAIN_NAMES[userCtx.selectedChain]
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
    //NATIVE Calls -> balance of native token per chain
    const eth_native = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.native_token}?chain=${MORALIS_CHAIN_NAMES.ethereum}`;

    const polygon_native = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.native_token}?chain=${MORALIS_CHAIN_NAMES.polygon}`;

    const avalanche_native = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.native_token}?chain=${MORALIS_CHAIN_NAMES.avalanche}`;

    //gets current prices of all chains native token
    const coingecko_api_native_prices = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=
    ${COINGECKO_NATIVE_CHAIN_NAMES.ethereum}%2C
    ${COINGECKO_NATIVE_CHAIN_NAMES.polygon}%2C
    ${COINGECKO_NATIVE_CHAIN_NAMES.avalanche}
    &per_page=100&page=1&sparkline=false&price_change_percentage=24h`;

    //ERC20 Calls -> token addresses per chain
    const eth_erc20 = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.erc20}?chain=${MORALIS_CHAIN_NAMES.ethereum}`;

    const polygon_erc20 = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.erc20}?chain=${MORALIS_CHAIN_NAMES.polygon}`;

    const avalanche_erc20 = `https://deep-index.moralis.io/api/v2/${userCtx.selectedWallet}/${TYPE.erc20}?chain=${MORALIS_CHAIN_NAMES.avalanche}`;

    setIsLoading(true);

    try {
      //balances
      const responseEthNativeBalace = await fetch(eth_native, {
        headers: MORALIS_API_HEADER,
      });
      const responsePolygonNativeBalace = await fetch(polygon_native, {
        headers: MORALIS_API_HEADER,
      });
      const responseAvalancheNativeBalace = await fetch(avalanche_native, {
        headers: MORALIS_API_HEADER,
      });

      //price of native balances
      const responseNativePrices = await fetch(coingecko_api_native_prices, {
        headers: COINGECKO_API_HEADER,
      });

      //balances of erc20 chains
      const responseEthErc20 = await fetch(eth_erc20, {
        headers: MORALIS_API_HEADER,
      });
      const responsePolygonErc20 = await fetch(polygon_erc20, {
        headers: MORALIS_API_HEADER,
      });
      const responseAvalancheErc20 = await fetch(avalanche_erc20, {
        headers: MORALIS_API_HEADER,
      });

      if (
        !responseEthErc20.ok ||
        !responsePolygonErc20.ok ||
        !responseAvalancheErc20.ok
      ) {
        throw new Error("Error fetching token data");
      }

      //balance quantity
      const ethNativeBalanceData = await responseEthNativeBalace.json();
      const polygonNativeBalanceData = await responsePolygonNativeBalace.json();
      const avalancheNativeBalanceData =
        await responseAvalancheNativeBalace.json();

      //all chain current balances for wallet
      const combinedNativePriceData = await responseNativePrices.json();

      const ethErc20Data = await responseEthErc20.json();
      const polygonErc20Data = await responsePolygonErc20.json();
      const avalancheErc20Data = await responseAvalancheErc20.json();

      const transformedEthErc20TokenData = ethErc20Data.map((tokenData) => {
        return {
          tokenAddress: tokenData.token_address,
          name: tokenData.name,
          balance: tokenData.balance,
          decimals: tokenData.decimals,
          symbol: tokenData.symbol,
          price: null,
          dayChange: null,
          totalValue: null,
          chain: USERCONTEXT_AVAILABLE_CHAINS.ethereum,
        };
      });

      const transformedPolygonErc20TokenData = polygonErc20Data.map(
        (tokenData) => {
          return {
            tokenAddress: tokenData.token_address,
            name: tokenData.name,
            balance: tokenData.balance,
            decimals: tokenData.decimals,
            symbol: tokenData.symbol,
            price: null,
            dayChange: null,
            totalValue: null,
            chain: USERCONTEXT_AVAILABLE_CHAINS.polygon,
          };
        }
      );

      const transformedAvalancheErc20TokenData = avalancheErc20Data.map(
        (tokenData) => {
          return {
            tokenAddress: tokenData.token_address,
            name: tokenData.name,
            balance: tokenData.balance,
            decimals: tokenData.decimals,
            symbol: tokenData.symbol,
            price: null,
            dayChange: null,
            totalValue: null,
            chain: USERCONTEXT_AVAILABLE_CHAINS.avalanche,
          };
        }
      );

      const ethAddresses = transformedEthErc20TokenData.map(
        (token) => token.tokenAddress
      );

      const polygonAddress = transformedPolygonErc20TokenData.map(
        (token) => token.tokenAddress
      );

      const avalancheAddress = transformedAvalancheErc20TokenData.map(
        (token) => token.tokenAddress
      );

      const ethCombinedAddresses = ethAddresses.join("%2C");
      const polygonCombinedAddresses = polygonAddress.join("%2C");
      const avalancheCombinedAddresses = avalancheAddress.join("%2C");

      const eth_api_prices = `https://api.coingecko.com/api/v3/simple/token_price/${COINGECKO_ERC20_CHAIN_NAMES.ethereum}?contract_addresses=${ethCombinedAddresses}&vs_currencies=usd&include_24hr_change=true`;
      const polygon_api_prices = `https://api.coingecko.com/api/v3/simple/token_price/${COINGECKO_ERC20_CHAIN_NAMES.polygon}?contract_addresses=${polygonCombinedAddresses}&vs_currencies=usd&include_24hr_change=true`;
      const avalanche_api_prices = `https://api.coingecko.com/api/v3/simple/token_price/${COINGECKO_ERC20_CHAIN_NAMES.avalanche}?contract_addresses=${avalancheCombinedAddresses}&vs_currencies=usd&include_24hr_change=true`;

      const responseEthPrices = await fetch(eth_api_prices, {
        headers: COINGECKO_API_HEADER,
      });
      const responsePolygonPrices = await fetch(polygon_api_prices, {
        headers: COINGECKO_API_HEADER,
      });
      const responseAvalanchePrices = await fetch(avalanche_api_prices, {
        headers: COINGECKO_API_HEADER,
      });

      //token addresses with prices per chain
      const ethErc20PriceData = await responseEthPrices.json();
      const polygonErc20PriceData = await responsePolygonPrices.json();
      const avalancheErc20PriceData = await responseAvalanchePrices.json();

      //converts fetched price data into improved format
      const ethErc20ConvertedPrices = Object.entries(ethErc20PriceData);
      const ethErc20NewPrices = ethErc20ConvertedPrices.map((data) => {
        return {
          tokenAddress: data[0],
          price: data[1]["usd"],
          change: data[1]["usd_24h_change"],
        };
      });

      const polygonErc20ConvertedPrices = Object.entries(polygonErc20PriceData);
      const polygonErc20NewPrices = polygonErc20ConvertedPrices.map((data) => {
        return {
          tokenAddress: data[0],
          price: data[1]["usd"],
          change: data[1]["usd_24h_change"],
        };
      });

      const avalancheErc20ConvertedPrices = Object.entries(
        avalancheErc20PriceData
      );
      const avalancheErc20NewPrices = avalancheErc20ConvertedPrices.map(
        (data) => {
          return {
            tokenAddress: data[0],
            price: data[1]["usd"],
            change: data[1]["usd_24h_change"],
          };
        }
      );

      //adds the price,24hourchange in price to data
      transformedEthErc20TokenData.forEach((tokenData) => {
        let foundAddress = ethErc20NewPrices.find(
          (priceData) => priceData.tokenAddress === tokenData.tokenAddress
        );
        if (foundAddress !== undefined) {
          tokenData.price = foundAddress["price"];
          tokenData.dayChange = foundAddress["change"];
        }
      });

      //adds the price,24hourchange in price to data
      transformedPolygonErc20TokenData.forEach((tokenData) => {
        let foundAddress = polygonErc20NewPrices.find(
          (priceData) => priceData.tokenAddress === tokenData.tokenAddress
        );
        if (foundAddress !== undefined) {
          tokenData.price = foundAddress["price"];
          tokenData.dayChange = foundAddress["change"];
        }
      });

      //adds the price,24hourchange in price to data
      transformedAvalancheErc20TokenData.forEach((tokenData) => {
        let foundAddress = avalancheErc20NewPrices.find(
          (priceData) => priceData.tokenAddress === tokenData.tokenAddress
        );
        if (foundAddress !== undefined) {
          tokenData.price = foundAddress["price"];
          tokenData.dayChange = foundAddress["change"];
        }

        const convertNativeData = (nativePrices, nativeBalanceData, chainName) => {
          const updatedNativeData = {};
          updatedNativeData.token_address = "NATIVE_TOKEN";
          updatedNativeData.name = NATIVE_TOKEN_NAMES[chainName];
          updatedNativeData.balance = nativeBalanceData.balance;
          updatedNativeData.decimals = 18;
          updatedNativeData.symbol = userCtx.selectedChain;
          updatedNativeData.price = nativePrices.current_price;
          updatedNativeData.totalValue = null;
          updatedNativeData.chain = chainName;

          return updatedNativeData;
        };

        const combinedFinalData = [
          ...transformedEthErc20TokenData,
          ...transformedPolygonErc20TokenData,
          ...transformedAvalancheErc20TokenData,
        ];

        if (ethNativeBalanceData.balance != 0) {
          const ethConvertedNativeData = convertNativeData(
            combinedNativePriceData[0],
            ethNativeBalanceData,
            USERCONTEXT_AVAILABLE_CHAINS.ethereum,
          );
          combinedFinalData.push(ethConvertedNativeData);
        }

        if (polygonNativeBalanceData.balance != 0) {
          const polygonConvertedNativeData = convertNativeData(
            combinedNativePriceData[2],
            polygonNativeBalanceData,
            USERCONTEXT_AVAILABLE_CHAINS.polygon,
          );
          combinedFinalData.push(polygonConvertedNativeData);
        }
        if (avalancheNativeBalanceData.balance != 0) {
          const avalancheConvertedNativeData = convertNativeData(
            combinedNativePriceData[1],
            avalancheNativeBalanceData,
            USERCONTEXT_AVAILABLE_CHAINS.avalanche,
          );
          combinedFinalData.push(avalancheConvertedNativeData);
        }
        setTokenData(combinedFinalData);
      });
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if(userCtx.wallets.length > 0){
    if (userCtx.selectedChain !== USERCONTEXT_AVAILABLE_CHAINS.all_available) {
      fetchSingleChainDataHandler();
    } else {
      fetchMultiChainDataHandler();
    }
  }
  }, [userCtx.selectedWallet, userCtx.selectedChain]);

  return {
    tokenData,
    isLoading,
    error,
  };
};

export default useFetch;
