import classes from "./Token.module.css";
import ArrowUp from "../../../../icons/token/arrowupgreen.svg";
import ArrowDown from "../../../../icons/token/arrowdownred.svg";
import PieChart from "../../../../icons/token/piechart.svg";
import AllChains from "../../../../icons/chains/all-chains.svg";
import Ethereum from "../../../../icons/chains/ethereum.svg";
import Avalanche from "../../../../icons/chains/avalanche.svg";
import Polygon from "../../../../icons/chains/polygon.svg";
import SpamToken from "../../../../icons/token/spam.svg";
import UnknownToken from "../../../../icons/token/questionmark.svg";

import UserContext from "../../../../context/UserContext";
import { useContext } from "react";

const Token = (props) => {

  const userCtx = useContext(UserContext);


  const calcPercentageOfTotal = (portfolioValue, tokenValue) => {
    return (tokenValue / portfolioValue) * 100
  }

  const formattedName = props.name.substring(0, 20);
  const formattedValue = userCtx.selectedCurrencySymbol + props.value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const formattedBalance = props.balance.toLocaleString("en-US", { maximumFractionDigits: 2 }).substring(0, 10);
  const formattedSymbol = props.symbol.substring(0, 10);
  const formattedDistributionAmount = calcPercentageOfTotal(props.portfolioValue, props.value).toLocaleString("en-US", { maximumFractionDigits: 3 }) + '%';
  const formattedPrice = userCtx.selectedCurrencySymbol + props.price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const formattedProfitLoss = userCtx.selectedCurrencySymbol + props.profitLoss.toLocaleString("en-US", { maximumFractionDigits: 4 });
  const formattedDayChange = props.dayChange.toLocaleString("en-US", { maximumFractionDigits: 1 }) + '%';

  const AVAILABLE_CHAINS = {
    ETHEREUM: "ethereum",
    POLYGON: "polygon",
    AVALANCHE: "avalanche",
    ALL_AVAILABLE: "all",
  };

  let tokenImage = '';
  if (props.image == 'NATIVE_TOKEN') {
    switch (props.chain) {
      case AVAILABLE_CHAINS.ETHEREUM:
        tokenImage = Ethereum;
        break;
      case AVAILABLE_CHAINS.POLYGON:
        tokenImage = Polygon;
        break;
      case AVAILABLE_CHAINS.AVALANCHE:
        tokenImage = Avalanche;
        break;
    }
  }

  if (props.image == 'unknown') {
    tokenImage = UnknownToken;
  } else if (props.image == 'spam') {
    tokenImage = SpamToken;
  } else if (tokenImage.length == 0) {
    tokenImage = props.image;
  }

  let chainIcon;
  switch (props.chain) {
    case AVAILABLE_CHAINS.ETHEREUM:
      chainIcon = Ethereum;
      break;
    case AVAILABLE_CHAINS.AVALANCHE:
      chainIcon = Avalanche;
      break;
    case AVAILABLE_CHAINS.POLYGON:
      chainIcon = Polygon;
      break;
    case AVAILABLE_CHAINS.ALL_AVAILABLE:
      chainIcon = AllChains;
      break;
  }


  let arrowIcon;
  //profit
  if (props.dayChange >= 0) {
    arrowIcon = ArrowUp;
  }
  //loss
  if (props.dayChange < 0) {
    arrowIcon = ArrowDown;
  }

  if (props.dayChange == 0) {
    arrowIcon = UnknownToken;
  }



  return (
    <li className={classes.token}>
      <img
        className={classes["token-image"]}
        src={tokenImage}
      />
      <div className={classes["name-percentage"]}>
        <p className={classes["name"]}>{formattedName}</p>
        <div className={classes["piechart-percentage"]}>
          <img className={classes["piechart"]} src={PieChart} />
          <p className={classes["portfolio-distribution-amount"]}>{formattedDistributionAmount}</p>
        </div>
      </div>
      <p className={classes["value"]}>{formattedValue}</p>
      <div className={classes["balance-container"]}>
        <p className={classes["balance"]}>{formattedBalance}</p>
        <p className={classes["symbol"]}>{formattedSymbol}</p>
      </div>
      <p className={classes["price"]}>{formattedPrice}</p>
      <div className={classes["profit-loss-percentage-change"]}>
        <p className={classes["profit-loss-amount"]}>{formattedProfitLoss}</p>
        <div className={classes["percentage-change-container"]}>
          <p className={classes["percentage-amount"]}>{formattedDayChange}</p>
          <img className={classes["arrow-image"]} src={arrowIcon} />
        </div>
      </div>
      <img className={classes["chain"]} src={chainIcon} />
    </li>
  );
};

export default Token;
