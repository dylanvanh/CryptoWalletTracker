import classes from "./TokenList.module.css";
import Token from "./Token";


//TODO 
//-> SORT BY VALUE
const TokenList = (props) => {

  const tokensWithPrice = props.tokenData.filter(token => token.price != undefined);
  
  const tokensWithoutPrice = props.tokenData;

  return (
    <ul className={classes['token-data']}>
      {tokensWithPrice.map((token) => (
        <Token
          key={token.tokenAddress}
          name={token.name}
          balance={token.balance}
          address={token.tokenAddress}
          symbol={token.symbol}
          price={token.price}
          dayChange={token.dayChange}
        />
      ))}
    </ul>
  )



}
export default TokenList;