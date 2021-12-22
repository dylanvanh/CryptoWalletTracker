import classes from "./Main.module.css";

import TransactionsDisplay from "./Transactions/TransactionsDisplay";
import PortfolioDisplay from "./Portfolio/PortfolioDisplay";
import GasStats from "./GasStats/GasDisplay";

//handles all the body components (BodyDisplay)
const MainDisplay = () => {
  return (
    <div className={classes["main-container"]}>
      <div className={classes["left-container"]}>left</div>
      <div className={classes["middle-container"]}>middle</div>
      <div className={classes["right-container"]}>right</div>
    </div>
  );
};

export default MainDisplay;
