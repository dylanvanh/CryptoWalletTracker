import classes from "./Main.module.css";

import TransactionsDisplay from "./Transactions/TransactionsDisplay";
import PortfolioDisplay from "./Portfolio/PortfolioDisplay";
import GasStats from "./GasStats/GasDisplay";

//handles all the body components (BodyDisplay)
const MainDisplay = (props) => {

  console.log('main = ', props.tokenData);

  return (
    <main className={classes["main-container"]}>
      <div className={classes["transactions1-display-container"]}>
        <TransactionsDisplay />
      </div>
      <div className={classes["portfolio-display-container"]}>
        <PortfolioDisplay tokenData={props.tokenData} />
      </div>
      <div className={classes["gas-stats-container"]}>
        <GasStats />
      </div>
    </main>
  );
};

export default MainDisplay;
