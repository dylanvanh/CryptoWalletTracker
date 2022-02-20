import { useState,useEffect } from "react";

const useFetchCurrencyData = () => {
  const [currencyData,setCurrencyData] = useState([])

  const fetchCurrencyData = async () => {
    const currencyApiCall = "https://www.currency-api.com/rates?base=USD";
    try {
      const responseCurrency = await fetch(currencyApiCall);

      if (!responseCurrency.ok) {
        throw new Error("Error fetching currency data");
      }
      const retrievedCurrencyData= await responseCurrency.json();
      console.log(retrievedCurrencyData)

      setCurrencyData(retrievedCurrencyData) 
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
    console.log(currencyData);
  }, []);

  return {
    currencyData,
  }
};

export default useFetchCurrencyData;
