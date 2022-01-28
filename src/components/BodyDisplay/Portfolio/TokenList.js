import classes from "./TokenList.module.css";
import Token from "./Token";
import { useCallback, useEffect, useState } from "react";


//TODO 
//-> SORT BY VALUE
const TokenList = (props) => {

  const [tokenData, setTokenData] = useState([]);
  // const [porfolioValue, setPortfolioValue] = useState(0);


  const handleTokens = useCallback(() => {

    const tokensWithPrice = props.tokenData.filter(token => token.price != undefined);

    let portfolioTotal = 0;

    tokensWithPrice.forEach((token) => {
      let decimalValue = ('0.' + '0'.repeat(token.decimals - 1) + '1');
      token.balance = (token.balance * decimalValue);
      token.price = (token.price);
      token.totalValue = token.balance * token.price;

      //further filter out spam coins
      if (token.totalValue > 0.1) {
        console.log('pv', +portfolioTotal)
        portfolioTotal += token.totalValue;
      }
    });

    //only display tokens with substantial value
    const finalTokensWithPrice = tokensWithPrice.filter(token => token.totalValue > 0.1)

    //sort by highest value
    finalTokensWithPrice.sort((a, b) => b.totalValue - a.totalValue)


    console.log('upv = ', +portfolioTotal)
    props.updateTotalValue(+portfolioTotal);

    setTokenData(finalTokensWithPrice);
  }, [props.tokenData]);


  useEffect(() => {
    handleTokens();

    //change first time load to false
  }, [])


  //if the hide $0.00 assets checkbox is unchecked
  //to be implemented
  const tokensWithoutPrice = props.tokenData;

  // const totalValue = (props.totalValue).toLocaleString('en-US')
  return (
    <ul className={classes['token-data']}>
      {tokenData.map((token) => (
        <Token
          key={token.tokenAddress}
          name={token.name}
          balance={(token.balance).toLocaleString('en-US',{maximumFractionDigits:2})}
          address={token.tokenAddress}
          symbol={token.symbol}
          price={(token.price).toLocaleString('en-US',{maximumFractionDigits:6})}
          dayChange={token.dayChange}
          value={(token.totalValue).toLocaleString('en-US',{maximumFractionDigits:2})}
        />
      ))}
    </ul>
  )



}
export default TokenList;