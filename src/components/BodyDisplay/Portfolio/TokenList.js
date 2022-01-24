import classes from "./TokenList.module.css";
import Token from "./Token";
import { useCallback, useEffect, useState } from "react";


//TODO 
//-> SORT BY VALUE
const TokenList = (props) => {

  const [tokenData, setTokenData] = useState([]);
  const [porfolioValue,setPortfolioValue] = useState(0);

  const handleTokens = useCallback(() => {
    const tokensWithPrice = props.tokenData.filter(token => token.price != undefined);

    let total = 0;

    tokensWithPrice.forEach((token) => {
      let decimalValue = ('0.' + '0'.repeat(token.decimals - 1) + '1');
      token.balance = (token.balance * decimalValue).toFixed(2);
      token.totalValue = (token.balance * token.price).toFixed(2);
      console.log(token.name, '=', token.balance)
      total += token.totalValue;
    });

    //sort by value

    tokensWithPrice.sort((a,b) => b.totalValue - a.totalValue)

    setPortfolioValue(total);
    setTokenData(tokensWithPrice);
  }, [props.tokenData]);


  useEffect(() => {
    handleTokens();

    //change first time load to false
  }, [])


  //if the hide $0.00 assets checkbox is unchecked
  //to be implemented
  const tokensWithoutPrice = props.tokenData;

  return (
    <ul className={classes['token-data']}>
      {tokenData.map((token) => (
        <Token
          key={token.tokenAddress}
          name={token.name}
          balance={token.balance}
          address={token.tokenAddress}
          symbol={token.symbol}
          price={token.price}
          dayChange={token.dayChange}
          value={token.price * token.balance}
        />
      ))}
    </ul>
  )



}
export default TokenList;