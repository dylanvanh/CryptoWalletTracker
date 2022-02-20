import { useState,useEffect } from "react";

const useFetchCurrencyData = () => {
  const [currencyData,setCurrencyData] = useState([])

  const fetchCurrencyData = async () => {
    const currencyApiCall = "https://freecurrencyapi.net/api/v2/latest?apikey=4a9eacc0-928e-11ec-a1c3-d5989bbaffcb";
    try {
      const responseCurrency = await fetch(currencyApiCall);

      if (!responseCurrency.ok) {
        throw new Error("Error fetching currency data");
      }
      const retrievedCurrencyData= await responseCurrency.json();
      console.log(retrievedCurrencyData)

      setCurrencyData(retrievedCurrencyData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  return {
    currencyData,
  }
};

export default useFetchCurrencyData;
