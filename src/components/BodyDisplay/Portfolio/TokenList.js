import { useEffect, useState, useContext } from "react";
import classes from "./TokenList.module.css";
import Token from "./Token";
import UserContext from "../../../context/UserContext";

const TokenList = (props) => {

  const [tokenDataNotSpam, setTokenDataNotSpam] = useState([]);
  const [tokenDataSpam, setTokenDataSpam] = useState([]);
  const spamTokenCheckboxValue = props.spamCheckBoxValue;
  const arrangeChainCheckBoxValue = props.arrangeChainCheckBoxValue;

  const [ethTotalValue, setEthTotalValue] = useState(0);
  const [polygonTotalValue, setPolygonTotalValue] = useState(0);
  const [avalancheTotalValue, setAvalancheTotalValue] = useState(0);


  const userCtx = useContext(UserContext);

  var finalTokensMinorPrice;

  const AVAILABLE_CHAINS = {
    ethereum: "ethereum",
    polygon: "polygon",
    avalanche: "avalanche",
    all_available: "all",
  };

  const handleTokensWithPrices = () => {

    const tokensWithPrice = props.tokenData.filter(
      (token) => token.price != undefined && token.price > 0 && token.decimals >= 1
    );

    let portfolioTotal = props.portfolioValue;

    tokensWithPrice.forEach((token) => {
      let decimalValue = "0." + "0".repeat(token.decimals - 1) + "1";
      token.balance = (token.balance * decimalValue).toFixed(2);
      token.price = (+token.price).toFixed(6);
      token.totalValue = token.balance * token.price;
      //further filter out spam coins
      if (token.totalValue > 0.1) {
        portfolioTotal += token.totalValue;
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

    const calculateChainValue = (chainName) => {
      let tempValue = (finalTokensWithPrice.filter((token) => token.chain == chainName)).reduce((total, token) => {
        return token.totalValue + total
      }, 0);
      return tempValue
    }

    setEthTotalValue(calculateChainValue(AVAILABLE_CHAINS.ethereum));
    setPolygonTotalValue(calculateChainValue(AVAILABLE_CHAINS.polygon));
    setAvalancheTotalValue(calculateChainValue(AVAILABLE_CHAINS.avalanche));
    props.updateTotalValue(portfolioTotal);
    setTokenDataNotSpam(finalTokensWithPrice);
  };

  const handleTokensWithoutPrices = () => {
    const tokensWithoutPrice = props.tokenData.filter(
      (token) => token.price == undefined || token.price == 0 || token.decimals < 1
    );

    //add the coins with under 0.1 value in portfolio -> likely spam coins
    Array.prototype.push.apply(tokensWithoutPrice, finalTokensMinorPrice);
    tokensWithoutPrice.forEach((token) => {
      if (+token.decimals > 0) {
        let decimalValue = "0." + "0".repeat(+token.decimals - 1) + "1";
        token.balance = token.balance * decimalValue;

        if (token.price == null || token.price === undefined || token.price == 0) {
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
  };

  const handleTokens = () => {
    //handle individual selected chain data
    handleTokensWithPrices(userCtx.selectedChain);
    handleTokensWithoutPrices(userCtx.selectedChain);
  };

  useEffect(() => {
    handleTokens();
  }, []);


  return (
    <>
      {arrangeChainCheckBoxValue &&
        <div>
          {userCtx.selectedChain == AVAILABLE_CHAINS.all_available &&
            <div>
              <h1>Ethereum: {ethTotalValue} </h1>
              <ul className={classes["token-data"]}>
                {tokenDataNotSpam.filter((token) => token.chain == AVAILABLE_CHAINS.ethereum).map((token) => (
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
                  tokenDataSpam.filter((token) => token.chain == AVAILABLE_CHAINS.ethereum).map((token) => (
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
          {userCtx.selectedChain == AVAILABLE_CHAINS.all_available &&
            <div>
              <h1>Polygon: {polygonTotalValue}</h1>
              <ul className={classes["token-data"]}>
                {tokenDataNotSpam.filter((token) => token.chain == AVAILABLE_CHAINS.polygon).map((token) => (
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
                  tokenDataSpam.filter((token) => token.chain == AVAILABLE_CHAINS.polygon).map((token) => (
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
          {userCtx.selectedChain == AVAILABLE_CHAINS.all_available &&
            <div>
              <h1>Avalanche: {avalancheTotalValue}</h1>
              <ul className={classes["token-data"]}>
                {tokenDataNotSpam.filter((token) => token.chain == AVAILABLE_CHAINS.avalanche).map((token) => (
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
                  tokenDataSpam.filter((token) => token.chain == AVAILABLE_CHAINS.avalanche).map((token) => (
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
        </div>}

      {!arrangeChainCheckBoxValue &&
        <div>
          <h1>{userCtx.selectedChain} Tokens</h1>
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
                <h1>{userCtx.selectedChain} Tokens without price: </h1>
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
