import classes from "./Assets.module.css";
import Card from "../../UI/Card";
import TokenList from "./TokenList";
import PortfolioSummary from "./PortfolioSummary";
import { useState } from "react";
import ViewAssettsCheckBox from "./ViewAssetsCheckbox";

const Assets = (props) => {

  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [spamCheckBoxValue, setSpamCheckBoxValue] = useState(false);

  const handleUpdateTotalValue = (value) => {
    setTotalPortfolioValue(value);
  }

  const handleCheckboxChange = () => {
    setSpamCheckBoxValue(!spamCheckBoxValue);
  }

  return (
    <>
      <div>
        <PortfolioSummary
          totalValue={totalPortfolioValue} />
      </div>
      <div className={classes.container}>
        <div className={classes.display}>
          <Card>
            <h2 className={classes.title}>Portfolio</h2>
            <ViewAssettsCheckBox handleCheckboxChange={handleCheckboxChange} checkboxState={spamCheckBoxValue} />
            <TokenList tokenData={props.tokenData} portfolioValue={totalPortfolioValue} updateTotalValue={handleUpdateTotalValue} checkBoxState={spamCheckBoxValue} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Assets;
