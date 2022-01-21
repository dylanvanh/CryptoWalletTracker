import classes from "./TokenList.module.css";
import Token from "./Token";


//TODO 
//-> SORT BY VALUE
const TokenList = (props) => {

  const tokensWithPrice = props.tokenData.filter(token => token.price != undefined);

  tokensWithPrice.forEach((token) => {
    let decimalValue = ('0.' + '0'.repeat(token.decimals-1) + '1');
    token.balance = (token.balance*decimalValue);
    token.totalValue = (token.balance*token.price);

    console.log(token.name,'=',token.balance)
  });

  //if the hide $0.00 assets checkbox is unchecked
  //to be implemented
  const tokensWithoutPrice = props.tokenData;

  console.log(tokensWithPrice)

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
          value={token.price*token.balance}
        />
      ))}
    </ul>
  )



}
export default TokenList;