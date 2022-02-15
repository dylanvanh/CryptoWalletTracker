import classes from "./Token.module.css";
import ArrowUp from '../../../icons/token/arrowupgreen.svg';
import ArrowDown from '../../../icons/token/arrowdownred.svg';
import PieChart from '../../../icons/token/piechart.svg';
import AllChains from '../../../icons/chains/all-chains.svg';
import Ethereum from '../../../icons/chains/ethereum.svg'
import Avalanche from '../../../icons/chains/avalanche.svg'
import Polygon from '../../../icons/chains/polygon.svg'
import UserContext from "../../../context/UserContext";
import { useContext } from "react";

const Token = (props) => {
  const userCtx = useContext(UserContext);

  const price = props.price;
  const formattedPrice = `$${price}`;


  let chainIcon;
  switch (userCtx.selectedChain) {
    case 'ethereum':
      chainIcon = Ethereum;
      break;
    case 'avalanche':
      chainIcon = Avalanche;
      break;
    case 'polygon':
      chainIcon = Polygon;
      break;
    case 'all':
      chainIcon = AllChains;
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
      <img className={classes['token-image']} src={'https://assets.coingecko.com/coins/images/21129/thumb/token_wsOHM_logo.png?1638764900'} />
      <div className={classes['name-percentage']}>
        <p className={classes['name']}>{props.name}</p>
        <div className={classes['piechart-percentage']}>
          <img className={classes['piechart']} src={PieChart} />
          <p className={classes['portfolio-distribution-amount']}>12.54%</p>
        </div>
      </div>
      <p className={classes['value']}>{props.value}</p>
      <p className={classes['balance']}>{props.balance}</p>
      <p className={classes['price']}>{formattedPrice}</p>
      <div className={classes['profit-loss-percentage-change']}>
        <p className={classes['profit-loss-amount']}>{props.profitLoss}</p>
        <div className={classes['percentage-change']}>
          <p className={classes['percentage-amount']}></p>
          <img className={classes['arrow-image']} src={arrowIcon} />
        </div>
      </div>
      <img className={classes['chain']} src={chainIcon} />
    </li >
  );
};



//   return (
//     <li className={classes.token}>
//         {props.tokenValue != 0 && <span className={classes.icon}><img src={arrowIcon} /></span>}
//         <span className={classes.name}>{props.name}</span>
//         <span className={classes.balance}>total balance = {props.balance}</span>
//         <span className={classes.price}>price per = {formattedPrice}</span>
//         <span className={classes.value}>value = {props.value}</span>
//         <span className={classes.dayChange}>pc : {props.dayChange}</span>
//         <span className={classes['profit-loss']}>profitloss= ${props.profitLoss}</span>
//     </li >
//   );
// };

export default Token;
