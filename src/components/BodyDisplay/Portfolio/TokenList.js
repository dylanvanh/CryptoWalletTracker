import { useEffect, useState, useContext } from "react";
import classes from "./TokenList.module.css";
import Token from "./Token";
import UserContext from "../../../context/UserContext";

const TokenList = (props) => {

  const [tokenDataNotSpam, setTokenDataNotSpam] = useState([]);
  const [tokenDataSpam, setTokenDataSpam] = useState([]);

  const [ethTokenDataNotSpam, setEthTokenDataNotSpam] = useState([]);
  const [ethTokenDataSpam, setEthTokenDataSpam] = useState([]);
  const [ethTotalValue, setEthTotalValue] = useState(0);

  const [polygonTokenDataNotSpam, setPolygonTokenDataNotSpam] = useState([]);
  const [polygonTokenDataSpam, setPolygonTokenDataSpam] = useState([]);
  const [polygonTotalValue, setPolygonTotalValue] = useState(0);

  const [avalancheTokenDataNotSpam, setAvalancheTokenDataNotSpam] = useState(
    []
  );
  const [avalancheTokenDataSpam, setAvalancheTokenDataSpam] = useState([]);
  const [avalancheTotalValue, setAvalancheTotalValue] = useState(0);

  const spamTokenCheckboxValue = props.checkBoxState;
  const userCtx = useContext(UserContext);

  var finalTokensMinorPrice;

  const AVAILABLE_CHAINS = {
    ETHEREUM: "ethereum",
    POLYGON: "polygon",
    AVALANCHE: "avalanche",
    ALL_AVAILABLE: "all",
  };

  const handleTokensWithPrices = (chainName) => {
    //just show tokens with value
    let chainTotalValue = 0;

    //will filter out the provided combined chain data(includes native chain and erc20 data)
    //if only 1 chain is selected , the filter will just return everything

    const filteredChainData = props.tokenData.filter(
      (token) => token.chain == chainName
    );

    const tokensWithPrice = filteredChainData.filter(
      (token) => token.price != undefined && token.price > 0 && token.decimals >= 1
    );

    let portfolioTotal = props.portfolioValue;

    tokensWithPrice.forEach((token) => {
      if (chainName == AVAILABLE_CHAINS.AVALANCHE) {
        console.log(token.price);
      }
      let decimalValue = "0." + "0".repeat(token.decimals - 1) + "1";
      token.balance = (token.balance * decimalValue).toFixed(2);
      token.price = (+token.price).toFixed(6);
      token.totalValue = token.balance * token.price;

      //further filter out spam coins
      if (token.totalValue > 0.1) {
        portfolioTotal += token.totalValue;
        chainTotalValue += token.totalValue;
      }
    });

    //only display tokens with substantial value
    const finalTokensWithPrice = tokensWithPrice.filter(
      (token) => token.totalValue > 0.1
    );
    finalTokensMinorPrice = tokensWithPrice.filter(
      (token) => token.totalValue <= 0.1
    );

    //sort by highest value
    finalTokensWithPrice.sort((a, b) => b.totalValue - a.totalValue);

    if (userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE) {
      const newTotal = props.portfolioValue + chainTotalValue;
      console.log(props.portfolioValue);
      console.log(chainTotalValue);
      props.updateTotalValue(newTotal);
    } else {
      //single chain selected
      props.updateTotalValue(chainTotalValue);
    }

    if (userCtx.selectedChain !== AVAILABLE_CHAINS.ALL_AVAILABLE) {
      setTokenDataNotSpam(finalTokensWithPrice);
      console.log('single chain data = ', tokenDataNotSpam);
    } else {
      console.log(chainName)
      if (chainName == AVAILABLE_CHAINS.ETHEREUM) {
        console.log('WORKS!!');
        setEthTokenDataNotSpam(finalTokensWithPrice);
        setEthTotalValue(chainTotalValue);
      }
      console.log(ethTokenDataNotSpam)
      if (chainName == AVAILABLE_CHAINS.POLYGON) {
        setPolygonTokenDataNotSpam(finalTokensWithPrice);
        setPolygonTotalValue(chainTotalValue);
      }
      if (chainName == AVAILABLE_CHAINS.AVALANCHE) {
        setAvalancheTokenDataNotSpam(finalTokensWithPrice);
        setAvalancheTotalValue(chainTotalValue);
      }
    }
  };

  const handleTokensWithoutPrices = (chainName) => {

    const filteredChainData = props.tokenData.filter(
      (token) => token.chain == chainName
    );

    const tokensWithoutPrice = filteredChainData.filter(
      (token) => token.price == undefined || token.price == 0 || token.decimals < 1
    );

    Array.prototype.push.apply(tokensWithoutPrice, finalTokensMinorPrice);

    tokensWithoutPrice.forEach((token) => {
      if (+token.decimals > 0) {
        let decimalValue = "0." + "0".repeat(+token.decimals - 1) + "1";
        token.balance = token.balance * decimalValue;

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

    if (userCtx.selectedChain !== AVAILABLE_CHAINS.ALL_AVAILABLE) {
      setTokenDataSpam(tokensWithoutPrice);
    } else {
      if (chainName == AVAILABLE_CHAINS.ETHEREUM) {
        setEthTokenDataSpam(tokensWithoutPrice);
      }
      if (chainName == AVAILABLE_CHAINS.POLYGON) {
        setPolygonTokenDataSpam(tokensWithoutPrice);
      }
      if (chainName == AVAILABLE_CHAINS.AVALANCHE) {
        setAvalancheTokenDataSpam(tokensWithoutPrice);
      }
    }
  };

  const handleTokens = () => {
    if (userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE) {
      //handle all avaialble chain data
      //eth
      console.log('eth started')
      handleTokensWithPrices(AVAILABLE_CHAINS.ETHEREUM);
      handleTokensWithoutPrices(AVAILABLE_CHAINS.ETHEREUM);

      //polygon
      console.log('polygon started')
      handleTokensWithPrices(AVAILABLE_CHAINS.POLYGON);
      handleTokensWithoutPrices(AVAILABLE_CHAINS.POLYGON);

      //avalanche
      console.log('avalanche started')
      handleTokensWithPrices(AVAILABLE_CHAINS.AVALANCHE);
      handleTokensWithoutPrices(AVAILABLE_CHAINS.AVALANCHE);
    } else {
      //handle individual selected chain data
      handleTokensWithPrices(userCtx.selectedChain);
      handleTokensWithoutPrices(userCtx.selectedChain);
    }
  };

  useEffect(() => {
    handleTokens();
  }, []);

  return (
    <>
      {userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE &&
        <div>
          <h1>Ethereum: {ethTotalValue} </h1>
          <ul className={classes["token-data"]}>
            {ethTokenDataNotSpam.map((token) => (
              <Token
                key={token.tokenAddress}
                name={token.name}
                balance={token.balance.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                address={token.tokenAddress}
                symbol={token.symbol}
                price={token.price.toLocaleString("en-US", {
                  maximumFractionDigits: 6,
                })}
                dayChange={token.dayChange}
                value={token.totalValue.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              />
            ))}
            {spamTokenCheckboxValue && (
              <div>
                <h1>Tokens without price:</h1>
              </div>
            )}
            {spamTokenCheckboxValue &&
              ethTokenDataSpam.map((token) => (
                <Token
                  key={token.tokenAddress}
                  name={token.name}
                  balance={token.balance.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                  address={token.tokenAddress}
                  symbol={token.symbol}
                  price={token.price.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}
                  dayChange={token.dayChange}
                  value={token.totalValue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                />
              ))}
          </ul>
        </div>
      }
      {userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE &&
        <div>
          <h1>Polygon: {polygonTotalValue} </h1>
          <ul className={classes["token-data"]}>
            {polygonTokenDataNotSpam.map((token) => (
              <Token
                key={token.tokenAddress}
                name={token.name}
                balance={token.balance.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                address={token.tokenAddress}
                symbol={token.symbol}
                price={token.price.toLocaleString("en-US", {
                  maximumFractionDigits: 6,
                })}
                dayChange={token.dayChange}
                value={token.totalValue.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              />
            ))}
            {spamTokenCheckboxValue && (
              <div>
                <h1>Tokens without price:</h1>
              </div>
            )}
            {spamTokenCheckboxValue &&
              polygonTokenDataSpam.map((token) => (
                <Token
                  key={token.tokenAddress}
                  name={token.name}
                  balance={token.balance.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                  address={token.tokenAddress}
                  symbol={token.symbol}
                  price={token.price.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}
                  dayChange={token.dayChange}
                  value={token.totalValue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                />
              ))}
          </ul>
        </div>
      }
      {userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE &&
        <div>
          <h1>Avalanche: {avalancheTotalValue} </h1>
          <ul className={classes["token-data"]}>
            {avalancheTokenDataNotSpam.map((token) => (
              <Token
                key={token.tokenAddress}
                name={token.name}
                balance={token.balance.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                address={token.tokenAddress}
                symbol={token.symbol}
                price={token.price.toLocaleString("en-US", {
                  maximumFractionDigits: 6,
                })}
                dayChange={token.dayChange}
                value={token.totalValue.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              />
            ))}
            {spamTokenCheckboxValue && (
              <div>
                <h1>Tokens without price:</h1>
              </div>
            )}
            {spamTokenCheckboxValue &&
              avalancheTokenDataSpam.map((token) => (
                <Token
                  key={token.tokenAddress}
                  name={token.name}
                  balance={token.balance.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                  address={token.tokenAddress}
                  symbol={token.symbol}
                  price={token.price.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}
                  dayChange={token.dayChange}
                  value={token.totalValue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                />
              ))}
          </ul>
        </div>
      }
      {userCtx.selectedChain != AVAILABLE_CHAINS.ALL_AVAILABLE &&
        <div>
          <ul className={classes["token-data"]}>
            {tokenDataNotSpam.map((token) => (
              <Token
                key={token.tokenAddress}
                name={token.name}
                balance={token.balance.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                address={token.tokenAddress}
                symbol={token.symbol}
                price={token.price.toLocaleString("en-US", {
                  maximumFractionDigits: 6,
                })}
                dayChange={token.dayChange}
                value={token.totalValue.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              />
            ))}
            {spamTokenCheckboxValue && (
              <div>
                <h1>Tokens without price:</h1>
              </div>
            )}
            {spamTokenCheckboxValue &&
              tokenDataSpam.map((token) => (
                <Token
                  key={token.tokenAddress}
                  name={token.name}
                  balance={token.balance.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                  address={token.tokenAddress}
                  symbol={token.symbol}
                  price={token.price.toLocaleString("en-US", {
                    maximumFractionDigits: 6,
                  })}
                  dayChange={token.dayChange}
                  value={token.totalValue.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                />
              ))}
          </ul>
        </div>
      }
    </>
  );
};
export default TokenList;
