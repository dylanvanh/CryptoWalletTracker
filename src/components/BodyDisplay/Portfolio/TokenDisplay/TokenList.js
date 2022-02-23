import Token from "./Token";
import UserContext from "../../../../context/UserContext";
import AllCoinGeckoTokenData from "../../../../coingecko-image-tokenlist/all.json";
import ChainSectionHeader from "./ChainSectionHeader";
import TokenListTitle from "./TokenListTitle";
import ChainListSection from "./ChainListSection";
import { useEffect, useState, useContext } from "react";

const TokenList = (props) => {
  const [tokenDataNotSpam, setTokenDataNotSpam] = useState([]);
  const [tokenDataSpam, setTokenDataSpam] = useState([]);
  const spamTokenCheckboxValue = props.spamCheckBoxValue;
  const arrangeChainCheckBoxValue = props.arrangeChainCheckBoxValue;

  const [ethereumTotalValue, setEthTotalValue] = useState(0);
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
      (token) =>
        token.price != undefined &&
        token.price > 0 &&
        token.decimals >= 1 &&
        token.dayChange != null
    );

    let portfolioTotal = props.portfolioValue;
    let dailyProfitLoss = props.dailyProfitLoss;

    const calcPriceChange = (currentDayTotalValue, dayChange) => {
      let previousDayTotalValue;
      let profitLossValue;
      //profit
      if (dayChange >= 0) {
        previousDayTotalValue = currentDayTotalValue / (1 - dayChange / 100);
        profitLossValue = previousDayTotalValue - currentDayTotalValue;
      }
      //loss
      if (dayChange < 0) {
        //determine the price before decrease
        previousDayTotalValue = (1 - dayChange / 100) * currentDayTotalValue;
        profitLossValue = currentDayTotalValue - previousDayTotalValue;
      }
      //round to two decimal places
      return profitLossValue;
    };

    tokensWithPrice.forEach((token) => {
      let decimalValue = "0." + "0".repeat(token.decimals - 1) + "1";
      token.balance = (token.balance * decimalValue).toFixed(2);
      token.price = (+token.price).toFixed(6);
      token.totalValue = token.balance * token.price;
      token.profitLoss = calcPriceChange(token.totalValue, token.dayChange);
      if (token.totalValue > 0.1) {
        portfolioTotal += token.totalValue;
        dailyProfitLoss += token.profitLoss;
      }
      if (token.token_address === "NATIVE_TOKEN") {
        token.image = "NATIVE_TOKEN";
      } else {
        //find the image in the json coingecko token file
        token.image = AllCoinGeckoTokenData["tokens"].filter(
          (coinGeckoToken) =>
            coinGeckoToken.symbol.toLowerCase() === token.symbol.toLowerCase()
        );
        //if the token was found
        if (token.image.length !== 0) {
          token.image = token.image[0]["logoURI"];
        } else {
          token.image = "unknown";
        }
      }
    });

    //further filter out potential spam coins (not registered on coingecko)
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
      let tempValue = finalTokensWithPrice
        .filter((token) => token.chain === chainName)
        .reduce((total, token) => {
          return token.totalValue + total;
        }, 0);
      return tempValue;
    };

    setEthTotalValue(calculateChainValue(AVAILABLE_CHAINS.ethereum));
    setPolygonTotalValue(calculateChainValue(AVAILABLE_CHAINS.polygon));
    setAvalancheTotalValue(calculateChainValue(AVAILABLE_CHAINS.avalanche));

    props.updateTotalValue(portfolioTotal);
    props.updateDailyProfitLoss(dailyProfitLoss);
    setTokenDataNotSpam(finalTokensWithPrice);
  };

  const handleTokensWithoutPrices = () => {
    const tokensWithoutPrice = props.tokenData.filter(
      (token) =>
        token.price == undefined ||
        token.price == 0 ||
        (token.decimals < 1 && token.dayChange != null)
    );

    //add the coins with under 0.1 value in portfolio -> likely spam coins
    Array.prototype.push.apply(tokensWithoutPrice, finalTokensMinorPrice);
    tokensWithoutPrice.forEach((token) => {
      token.profitLoss = null;
      token.image = "spam";
      token.price = 0;
      token.totalValue = 0;
      token.profitLoss = 0;
      token.dayChange = 0;

      if (token.name == null) {
        token.name = "";
      }

      if (token.symbol == null) {
        token.symbol = "";
      }

      if (+token.decimals > 0) {
        let decimalValue = "0." + "0".repeat(+token.decimals - 1) + "1";
        token.balance = token.balance * decimalValue;

        if (token.price == null || token.price == undefined) {
          token.dayChange = 0;
        }
        //further filter out spam coins
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
      <div>
        {/*Display by chain */}
        {arrangeChainCheckBoxValue && (
          <div>
            <ChainListSection
              tokenDataNotSpam={tokenDataNotSpam}
              tokenDataSpam={tokenDataSpam}
              chain={AVAILABLE_CHAINS.ethereum}
              value={ethereumTotalValue}
              spamTokenCheckboxValue={spamTokenCheckboxValue}
              portfolioValue={props.portfolioValue}
            />
            <ChainListSection
              tokenDataNotSpam={tokenDataNotSpam}
              tokenDataSpam={tokenDataSpam}
              chain={AVAILABLE_CHAINS.polygon}
              value={polygonTotalValue}
              spamTokenCheckboxValue={spamTokenCheckboxValue}
              portfolioValue={props.portfolioValue}
            />
            <ChainListSection
              tokenDataNotSpam={tokenDataNotSpam}
              tokenDataSpam={tokenDataSpam}
              chain={AVAILABLE_CHAINS.avalanche}
              value={avalancheTotalValue}
              spamTokenCheckboxValue={spamTokenCheckboxValue}
              portfolioValue={props.portfolioValue}
            />
          </div>
        )}

        {/*Display by one chain format (all_chains) counts as 1 chain*/}
        {!arrangeChainCheckBoxValue && (
          <div>
            <div>
              <ChainSectionHeader
                chain={userCtx.selectedChain}
                value={props.portfolioValue * userCtx.selectedCurrencyValue}
              />
              <TokenListTitle />
              <ul>
                {tokenDataNotSpam.map((token) => (
                  <Token
                    key={token.tokenAddress}
                    image={token.image}
                    name={token.name}
                    balance={token.balance}
                    address={token.tokenAddress}
                    symbol={token.symbol}
                    price={token.price * userCtx.selectedCurrencyValue}
                    dayChange={token.dayChange}
                    value={token.totalValue * userCtx.selectedCurrencyValue}
                    profitLoss={
                      token.profitLoss * userCtx.selectedCurrencyValue
                    }
                    chain={token.chain}
                    portfolioValue={
                      props.portfolioValue * userCtx.selectedCurrencyValue
                    }
                  />
                ))}
                {spamTokenCheckboxValue && (
                  <div>
                    <ChainSectionHeader
                      chain={userCtx.selectedChain}
                      value={0}
                      spam={true}
                    />
                    {tokenDataSpam.map((token) => (
                      <Token
                        key={token.tokenAddress}
                        image={token.image}
                        name={token.name}
                        balance={token.balance}
                        address={token.tokenAddress}
                        symbol={token.symbol}
                        price={token.price}
                        dayChange={token.dayChange}
                        value={token.totalValue}
                        profitLoss={token.profitLoss}
                        chain={token.chain}
                        portfolioValue={0}
                      />
                    ))}
                  </div>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default TokenList;
