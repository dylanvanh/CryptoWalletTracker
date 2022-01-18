import classes from "./Token.module.css";

const Token = (props) => {
  
  const price = 0;
  const formattedPrice = `$${price}`;

  //for rounding and correcting api returned value for balance
  const formatBalance = (balance) => {
    return ((balance/1000000000000000000).toFixed(5));
  }


  return (
    <li className={classes.token}>
      <div className={classes.container}>
        <span className={classes.name}>{props.name}</span>
        <span className={classes.balance}>{formatBalance(props.balance)}</span>
        <span className={classes.price}>{formattedPrice}</span>
        {/* <h4>{props.address}</h4>
      <h3>{props.symbol}</h3> */}
      </div>
    </li>
  );
};

export default Token;
