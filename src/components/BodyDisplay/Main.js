import classes from "./Main.module.css";

import TransactionsDisplay from "./Transactions/TransactionsDisplay";
import PortfolioDisplay from "./Portfolio/PortfolioDisplay";
import GasStats from "./GasStats/GasDisplay";

//handles all the body components (BodyDisplay)
const MainDisplay = (props) => {

  const erc20TokenData = props.erc20;
  const nativeTokenData = props.native;

  return (
    <main className={classes["main-container"]}>
      <div className={classes["transactions-display-container"]}>
        <TransactionsDisplay />
      </div>
      <div className={classes["portfolio-display-container"]}>
        <PortfolioDisplay tokenData={erc20TokenData}/>
      </div>
      <div className={classes["gas-stats-container"]}>
        <GasStats />
      </div>
    </main>
  );
};

export default MainDisplay;
