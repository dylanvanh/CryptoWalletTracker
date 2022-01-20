
const newPrices = convertedPrices.map((data) => {
  return {
    tokenAddress: data[0],
    price: data[1]['usd'],