import { useState, useEffect } from "react";

const useFetchCurrencyData = () => {
  const [currencyData, setCurrencyData] = useState([]);

  const fetchCurrencyData = async () => {
    const currencyApiCall = `https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.REACT_APP_CURRENCY_API_KEY}`;

    try {
      const responseCurrency = await fetch(currencyApiCall);

      if (!responseCurrency.ok) {
        throw new Error("Error fetching currency data");
      }
      const retrievedCurrencyData = await responseCurrency.json();

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
  };
};

export default useFetchCurrencyData;
