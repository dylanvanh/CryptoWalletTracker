import classes from "./Main.module.css";

import TransactionsDisplay from "./Transactions/TransactionsDisplay";
import Assets from "./Portfolio/Assets";
import GasStats from "./GasStats/GasDisplay";

//handles all the body components (BodyDisplay)
const MainDisplay = (props) => {

  return (
    <main className={classes["main-container"]}>
      <div className={classes["transactions-display-container"]}>
        <TransactionsDisplay />
      </div>
      <div className={classes["Assets-container"]}>
        <Assets tokenData={props.tokenData} />
      </div>
      <div className={classes["gas-stats-container"]}>
        <GasStats />
      </div>
    </main>
  );
};

export default MainDisplay;
