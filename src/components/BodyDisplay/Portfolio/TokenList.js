import { useEffect, useState } from "react";
import classes from "./TokenList.module.css";
import Token from "./Token";

const TokenList = (props) => {

  const [tokenDataNotSpam, setTokenDataNotSpam] = useState([]);
  const [tokenDataSpam, setTokenDataSpam] = useState([]);

  const spamTokenCheckboxValue = props.checkBoxState;

  var finalTokensMinorPrice;

  const handleTokensWithPrices = () => {
    //just show tokens with value

    const tokensWithPrice = props.tokenData.filter(token => token.price != undefined);
    console.log('tokensWithPrice = ',tokensWithPrice);
    let portfolioTotal = 0;

    tokensWithPrice.forEach((token) => {
      let decimalValue = ('0.' + '0'.repeat(token.decimals - 1) + '1');
      token.balance = (token.balance * decimalValue).toFixed(2);
      token.price = (+token.price).toFixed(6);
      token.totalValue = token.balance * token.price;

      // console.log(token.name)
      // console.log(token.totalValue);
      //further filter out spam coins
      if (token.totalValue > 0.1) {
        portfolioTotal += token.totalValue;
      }
    });

    //only display tokens with substantial value
    const finalTokensWithPrice = tokensWithPrice.filter(token => token.totalValue > 0.1);
    finalTokensMinorPrice = tokensWithPrice.filter(token => token.totalValue <= 0.1);

    //sort by highest value
    finalTokensWithPrice.sort((a, b) => b.totalValue - a.totalValue);

    props.updateTotalValue(+portfolioTotal);

    setTokenDataNotSpam(finalTokensWithPrice);
  }


  const handleTokensWithoutPrices = () => {
    const tokensWithoutPrice = props.tokenData.filter(token => token.price == undefined);

    Array.prototype.push.apply(tokensWithoutPrice, finalTokensMinorPrice);

    tokensWithoutPrice.forEach((token) => {
      if (+token.decimals > 0) {
        let decimalValue = ('0.' + '0'.repeat(+token.decimals - 1) + '1');
        token.balance = (token.balance * decimalValue);

        if (token.price == null) {
          token.price = 0;
          token.totalValue = 0;
        }
        //further filter out spam coins
      } else {
        token.price = 0;
        token.totalValue = 0;
      }
    });

    //sort by highest value


    tokensWithoutPrice.sort((a, b) => b.balance - a.balance);

    setTokenDataSpam(tokensWithoutPrice);
  }

  const handleTokens = () => {
    handleTokensWithPrices();
    handleTokensWithoutPrices();
  };

  useEffect(() => {
    handleTokens()
  }, [])

  return (
    <>
      <div>
        <h1>Tokens with price:</h1>
      </div>
      <ul className={classes['token-data']}>
        {tokenDataNotSpam.map((token) => (
          <Token
            key={token.tokenAddress}
            name={token.name}
            balance={(token.balance).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            address={token.tokenAddress}
            symbol={token.symbol}
            price={(token.price).toLocaleString('en-US', { maximumFractionDigits: 6 })}
            dayChange={token.dayChange}
            value={(token.totalValue).toLocaleString('en-US', { maximumFractionDigits: 2 })}
          />
        ))}
        {spamTokenCheckboxValue &&
          <div>
            <h1>Tokens without price:</h1>
          </div>
        }
        {spamTokenCheckboxValue && tokenDataSpam.map((token) => (
          <Token
            key={token.tokenAddress}
            name={token.name}
            balance={(token.balance).toLocaleString('en-US', { maximumFractionDigits: 2 })}
            address={token.tokenAddress}
            symbol={token.symbol}
            price={(token.price).toLocaleString('en-US', { maximumFractionDigits: 6 })}
            dayChange={token.dayChange}
            value={(token.totalValue).toLocaleString('en-US', { maximumFractionDigits: 2 })}
          />
        ))}
      </ul>
    </>
  )
}
export default TokenList;