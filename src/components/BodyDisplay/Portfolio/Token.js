import classes from "./Token.module.css";
import ArrowUp from "../../../icons/token/arrowupgreen.svg";
import ArrowDown from "../../../icons/token/arrowdownred.svg";
import PieChart from "../../../icons/token/piechart.svg";
import AllChains from "../../../icons/chains/all-chains.svg";
import Ethereum from "../../../icons/chains/ethereum.svg";
import Avalanche from "../../../icons/chains/avalanche.svg";
import Polygon from "../../../icons/chains/polygon.svg";
import SpamToken from "../../../icons/token/spam.svg";

const Token = (props) => {

  const formattedValue = '$' + props.value.toLocaleString("en-US", {maximumFractionDigits: 2})
  const formattedBalance = props.balance.toLocaleString("en-US", {maximumFractionDigits: 2});
  const formattedPrice = `$${props.price}`;
  const formattedProfitLoss = `$${props.profitLoss}`;
  const formattedDayChange = props.dayChange.toLocaleString("en-US", {maximumFractionDigits: 1}) + '%';


  console.log(props.chain);
  let chainIcon;
  switch (props.chain) {
    case "ethereum":
      chainIcon = Ethereum;
      break;
    case "avalanche":
      chainIcon = Avalanche;
      break;
    case "polygon":
      chainIcon = Polygon;
      break;
    case "all":
      chainIcon = AllChains;
      break;
    default:
      chainIcon = Ethereum;
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

  //icon -> need to get

  //name
  //percentage -> need to get

  //value
  //balance
  //price
  //profitloss
  //percentageChange
  //chain

  return (
    <li className={classes.token}>
      <img
        className={classes["token-image"]}
        src={
          "https://assets.coingecko.com/coins/images/21129/thumb/token_wsOHM_logo.png?1638764900"
        }
      />
      <div className={classes["name-percentage"]}>
        <p className={classes["name"]}>{props.name}</p>
        <div className={classes["piechart-percentage"]}>
          <img className={classes["piechart"]} src={PieChart} />
          <p className={classes["portfolio-distribution-amount"]}>12.54%</p>
        </div>
      </div>
      <p className={classes["value"]}>{formattedValue}</p>
      <div className={classes["balance-container"]}>
        <p className={classes["balance"]}>{formattedBalance}</p>
        <p className={classes["symbol"]}>{props.symbol}</p>
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
