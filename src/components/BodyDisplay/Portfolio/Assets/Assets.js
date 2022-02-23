import classes from "./Assets.module.css";
import TokenList from "./TokenDisplay/TokenList";
import AssetOptionsMenu from "../Checkbox/AssetOptionsMenu";
import { useState } from "react";

const Assets = (props) => {
  const [spamCheckBoxValue, setSpamCheckBoxValue] = useState(false);
  const [arrangeChainCheckBoxValue, setArrangeChainCheckBoxValue] =
    useState(false);

  const handleArrangedChainDisplay = () => {
    setArrangeChainCheckBoxValue(!arrangeChainCheckBoxValue);
  };

  const handleSpamAssetsCheckboxChange = () => {
    setSpamCheckBoxValue(!spamCheckBoxValue);
  };

  return (
    <>
      <div className={classes["assets"]}>
        <div className={classes.container}>
          <div className={classes["checkbox-menu"]}>
            <AssetOptionsMenu
              handleArrangedChainDisplay={handleArrangedChainDisplay}
              handleSpamAssetsCheckboxChange={handleSpamAssetsCheckboxChange}
            />
          </div>
          <div className={classes["token-list"]}>
            <TokenList
              tokenData={props.tokenData}
              portfolioValue={props.portfolioValue}
              updateTotalValue={props.updateTotalValue}
              dailyProfitLoss={props.dailyProfitLoss}
              updateDailyProfitLoss={props.updateDailyProfitLoss}
              spamCheckBoxValue={spamCheckBoxValue}
              arrangeChainCheckBoxValue={arrangeChainCheckBoxValue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Assets;
