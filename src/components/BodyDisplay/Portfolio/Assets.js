import classes from "./Assets.module.css";
import Card from "../../UI/Card";
import TokenList from "./TokenList";
import PortfolioSummary from "./PortfolioSummary";
import { useState } from "react";
const Assets = (props) => {

  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  const updateTotalValue = (value) => {
    setTotalPortfolioValue(value);
  }
  
  return (
    <>
      <div>
        <PortfolioSummary totalValue={totalPortfolioValue} />
      </div>
      <div className={classes.container}>
        <div className={classes.display}>
          <Card>
            <h2 className={classes.title}>Portfolio</h2>
            <TokenList updateTotalValue={updateTotalValue} tokenData={props.tokenData} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Assets;
