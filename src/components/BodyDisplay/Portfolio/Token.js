
import classes from "./Token.module.css";

const Token = (props) => {
  return (
    <li className={classes.token}>
      <h2>{props.name}</h2>
      <h3>{props.balance}</h3>
      {/* <h4>{props.address}</h4>
      <h3>{props.symbol}</h3> */}
    </li>
  );
};

export default Token;