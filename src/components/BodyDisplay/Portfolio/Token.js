import classes from "./Token.module.css";
import ArrowUp from '../../../icons/token/arrowupgreen.svg';
import ArrowDown from '../../../icons/token/arrowdownred.svg';

const Token = (props) => {
  const price = props.price;
  const formattedPrice = `$${price}`;

  let arrowIcon;

  //profit
  if (props.dayChange >= 0) {
    arrowIcon = ArrowUp;
  }

  //loss
  if (props.dayChange < 0) {
    arrowIcon = ArrowDown;
  }



  return (
    <li className={classes.token}>
      <div className={classes.container}>
        {props.tokenValue != 0 && <span className={classes.icon}><img src={arrowIcon} /></span>}
        <span className={classes.name}>{props.name}</span>
        <span className={classes.balance}>total balance = {props.balance}</span>
        <span className={classes.price}>price per = {formattedPrice}</span>
        <span className={classes.value}>value = {props.value}</span>
        <span className={classes.dayChange}>pc : {props.dayChange}</span>
        <span className={classes['profit-loss']}>profitloss= ${props.profitLoss}</span>
      </div>
    </li >
  );
};

export default Token;
