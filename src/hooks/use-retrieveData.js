import { useState, useEffect, useCallback } from 'react';



//fetch the native token name + balance
//fetch the erc20 tokens name + balance

//combine into multiple objects into 1 array 
//filter through and seperate the items with balances

//use the coingecko api to retrieve the prices for each of the requested items

//ERC20

const useRetrieveData = (chain) => {

  const CHAIN_NAMES = {
    POLYGON: 'polygon',
    ETHEREUM: 'eth',
    AVALANCHE: 'avalanche',
  }
  const TYPE = {
    NATIVE_TOKEN: 'balance',
    ERC20: 'erc20',
  }

  const selectedWallet = '0x057Ec652A4F150f7FF94f089A38008f49a0DF88e'
  const api_call_native = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.NATIVE_TOKEN}?chain=${CHAIN_NAMES.POLYGON}`
  const api_call_erc20 = `https://deep-index.moralis.io/api/v2/${selectedWallet}/${TYPE.ERC20}?chain=${CHAIN_NAMES.POLYGON}`

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {

  },[chain])

  const sendRequest = useCallback(async () => {

    console.log('sendRequest() running');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        api_call_erc20, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-Key': `${process.env.REACT_APP_X_API_KEY}`,
        }
      });

      const data = await response.json();
      const loadedTokens = [];

      for (const key in data) {
        loadedTokens.push({
          id: key,
          address: data[key].token_address,
          name: data[key].name,
          decimals: data[key].name,
          balance: data[key].balance,
        })
      }

      if (!response.ok) {
        throw new Error('Failed Request')
      }
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {

  }, [sendRequest])


  // const sortFetchedData = (data) => {
  //   // const updatedData = data.filter();
  // }

  console.log('test does this show!')

  return {
    response: 'test',
    isLoading,
    error,
  };

};

export default useRetrieveData;