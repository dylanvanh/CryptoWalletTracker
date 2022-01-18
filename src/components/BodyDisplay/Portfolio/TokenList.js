import classes from "./TokenList.module.css";
import Token from "./Token";


//TODO 
//-> SORT BY VALUE
const TokenList = (props) => {
  return (
    <ul className={classes['token-data']}>
      {props.tokenData.map((token) => (
        <Token
          key={token.tokenAddress}
          name={token.name}
          balance={token.balance}
          address={token.tokenAddress}
          symbol={token.symbol}
          // price={token.price}
        />
      ))}
    </ul>
  )



}
export default TokenList;