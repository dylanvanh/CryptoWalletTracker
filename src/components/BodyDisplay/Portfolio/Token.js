import classes from "./Token.module.css";

const Token = (props) => {

  const price = props.price;
  const formattedPrice = `$${price}`;



  //for rounding and correcting api returned value for balance
  // const formatBalance = (balance) => {
  //   return ((balance / 1000000000000000000).toFixed(5));
  // }

  return (
    <li className={classes.token}>
      <div className={classes.container}>
        <span className={classes.name}>{props.name}</span>
        <span className={classes.balance}>total balance = {props.balance}</span>
        <span className={classes.price}>price per = {formattedPrice}</span>
        <span className={classes.value}>value = {props.value}</span>
        {/* <span className={classes.dayChange}>{props.dayChange}</span> */}
      </div>
    </li >
  );
};

export default Token;
