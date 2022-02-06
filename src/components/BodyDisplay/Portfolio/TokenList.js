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
      (token) => token.price != undefined
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

    props.updateTotalValue(+portfolioTotal);

    console.log('function running',chainName)

    if (userCtx.selectedChain !== AVAILABLE_CHAINS.ALL_AVAILABLE) {
      console.log('single chain')
      console.log(finalTokensWithPrice)
      setTokenDataNotSpam(finalTokensWithPrice);
    } else {
      console.log('multichain')
      console.log(chainName)
      // if (AVAILABLE_CHAINS[chainName] === AVAILABLE_CHAINS.ETHEREUM) {
        console.log('chain eth')
        setEthTokenDataNotSpam(finalTokensWithPrice);
        setEthTotalValue(chainTotalValue);  
        console.log(finalTokensWithPrice);
        console.log(ethTotalValue);
      // }
      if (chainName === AVAILABLE_CHAINS.POLYGON) {
        console.log('chain polygon')
        setPolygonTokenDataNotSpam(finalTokensWithPrice);
        setPolygonTotalValue(chainTotalValue);
        console.log(finalTokensWithPrice)
        console.log(polygonTotalValue);
      }
      if (chainName === AVAILABLE_CHAINS.AVALANCHE) {
        console.log('chain avalanche')
        setAvalancheTokenDataNotSpam(finalTokensWithPrice);
        setAvalancheTotalValue(chainTotalValue);
        console.log(finalTokensWithPrice);
        console.log(avalancheTotalValue);
      }
    }
  };

  const handleTokensWithoutPrices = (chainName) => {
    const tokensWithoutPrice = props.tokenData.filter(
      (token) => token.price == undefined
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
      if (chainName === AVAILABLE_CHAINS.ETHEREUM) {
        setEthTokenDataSpam(tokensWithoutPrice);
      }
      if (chainName === AVAILABLE_CHAINS.POLYGON) {
        setPolygonTokenDataSpam(tokensWithoutPrice);
      }
      if (chainName === AVAILABLE_CHAINS.AVALANCHE) {
        setAvalancheTokenDataSpam(tokensWithoutPrice);
      }
    }
  };

  const handleTokens = () => {
    if (userCtx.selectedChain === AVAILABLE_CHAINS.ALL_AVAILABLE) {
      //handle all avaialble chain data
      //eth
      handleTokensWithPrices(AVAILABLE_CHAINS.ETHEREUM);
      handleTokensWithoutPrices(AVAILABLE_CHAINS.ETHEREUM);
      //polygon
      handleTokensWithPrices(AVAILABLE_CHAINS.POLYGON);
      handleTokensWithoutPrices(AVAILABLE_CHAINS.POLYGON);

      //avalanche
      handleTokensWithPrices(AVAILABLE_CHAINS.AVALANCHE);
      handleTokensWithoutPrices(AVAILABLE_CHAINS.AVALANCHE);
    } else {
      //handle individual selected chain data
      handleTokensWithPrices(userCtx.selectedChain);
      handleTokensWithoutPrices(userCtx.selectedChain);
    }

  };

  useEffect(() => {
    console.log('props data = ', props.tokenData)
    handleTokens();
  }, []);

  return (
    <>
      <div>
        <h1>Tokens with price:</h1>
      </div>
      {userCtx.selectedChain != AVAILABLE_CHAINS.ALL_AVAILABLE && (
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
      )}
      {/* <h1>Ethereum</h1>
      {ethTokenDataNotSpam &&
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
        <h1>Polygon</h1>
      {polygonTokenDataNotSpam &&
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
        <h1>Avalanche</h1>
      {avalancheTokenDataNotSpam &&
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
        ))} */}
    </>
  );
};
export default TokenList;
