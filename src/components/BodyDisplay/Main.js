import classes from "./Main.module.css";
import Assets from "./Portfolio/Assets";
import PortfolioSummary from "./Portfolio/PortfolioSummary";
import ChainGasDisplay from "./GasStats/ChainGasDisplay";
import Footer from "../FooterBar/Footer";
import Vault from "../../icons/vault.svg";
import { useState } from "react";

//handles all the body (main) components 
const MainDisplay = (props) => {
  
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [dailyProfitLoss, setDailyProfitLoss] = useState(0);

  const handleUpdateTotalValue = (value) => {
    setTotalPortfolioValue(value);
  }

  const handleUpdateDailyProfitLoss = (value) => {
    setDailyProfitLoss(value);
  }

  return (
    <main className={classes['main']}>
      <section className={classes['top']}>
        <div className={classes['vault-header']}>
          <img src={Vault} alt='vault' />
          <h1 className={classes['portfolio-title']}>Portfolio</h1>
        </div>
        <div className={classes['portfolio-summary']}>
          <PortfolioSummary portfolioValue={totalPortfolioValue} profitLoss={dailyProfitLoss} />
        </div>
        <div className={classes['gas-stats']}>
          <ChainGasDisplay />
        </div>
      </section>
      <section className={classes['centre']} >
        <section className={classes["assets-container"]}>
          <Assets tokenData={props.tokenData}
            portfolioValue={totalPortfolioValue} updateTotalValue={handleUpdateTotalValue}
            dailyProfitLoss={dailyProfitLoss} updateDailyProfitLoss={handleUpdateDailyProfitLoss} />
        </section>
      </section>
      <Footer />
    </main>
  );
};

export default MainDisplay;
