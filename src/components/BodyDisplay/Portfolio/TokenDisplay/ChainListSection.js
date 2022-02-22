import Token from "./Token";
import ChainSectionHeader from "./ChainSectionHeader";
import UserContext from "../../../../context/UserContext";
import TokenListTitle from "./TokenListTitle";
import { useEffect, useState, useContext } from "react";

const ChainListSection = (props) => {
  const tokenDataNotSpam = props.tokenDataNotSpam;
  const tokenDataSpam = props.tokenDataSpam;
  const value = props.value;
  const spamTokenCheckboxValue = props.spamTokenCheckboxValue;
  const chain = props.chain;
  const [hasPriceTokens, setHasPriceTokens] = useState(false);
  const [hasSpamTokens, setHasSpamTokens] = useState(false);

  const [mappedPriceTokens, setMappedPriceTokens] = useState([]);
  const [mappedSpamTokens, setMappedSpamTokens] = useState([]);

  const userCtx = useContext(UserContext);

  const mapTokens = (tokenData, spam) => {
    console.log(tokenData, spam);
    const checkChainIsEmpty = (tokenData, spam) => {
      const foundItem = tokenData.find((token) => token.chain === chain);

      //not spam tokens
      if (!spam) {
        if (foundItem === undefined) {
          //default state set to true
          return;
        }

        console.log("founditem = ", foundItem);
        setHasPriceTokens(true);
      } else {
        //spam tokens
        if (foundItem === undefined) {
          return;
        }
        console.log("founditem = ", foundItem);

        setHasSpamTokens(true);
      }
    };

    if (!spam) {
      const tokensMapped = tokenData
        .filter((token) => token.chain === chain)
        .map((token) => (
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
            profitLoss={token.profitLoss * userCtx.selectedCurrencyValue}
            chain={token.chain}
            portfolioValue={
              props.portfolioValue * userCtx.selectedCurrencyValue
            }
          />
        ));

      //pass tokenDataNotSpam data
      checkChainIsEmpty(tokenData, false);
      setMappedPriceTokens(tokensMapped);
    } else {
      //spam data
      const tokensMapped = tokenData
        .filter((token) => token.chain === chain)
        .map((token) => (
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
        ));

      //pass spam tokenData
      checkChainIsEmpty(tokenData, true);
      setMappedSpamTokens(tokensMapped);
    }
  };

  useEffect(() => {
    mapTokens(tokenDataNotSpam, false);
    console.log(mappedPriceTokens);
  });

  useEffect(() => {
    mapTokens(tokenDataSpam, true);
    console.log(mappedSpamTokens);
  });

  //if the token has a value -> display the value

  return (
    <ul>
      {
        <div>
          {hasPriceTokens && (
            <div>
              <ChainSectionHeader chain={chain} value={value} spam={false} />
              <TokenListTitle />
              {mappedPriceTokens}
            </div>
          )}
        </div>
      }
      {spamTokenCheckboxValue && (
        <div>
          {hasSpamTokens && (
            <div>
              <ChainSectionHeader chain={chain} value={0} spam={true} />
              <TokenListTitle />
              {mappedSpamTokens}
            </div>
          )}
        </div>
      )}
    </ul>
  );
};

export default ChainListSection;
