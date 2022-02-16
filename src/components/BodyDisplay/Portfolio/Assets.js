import classes from "./Assets.module.css";
import Card from "../../UI/Card";
import TokenList from "./TokenList";
import { useState, useContext } from "react";
import AssettsCheckBox from "./AssetCheckbox";
import UserContext from "../../../context/UserContext";

const Assets = (props) => {
  const [spamCheckBoxValue, setSpamCheckBoxValue] = useState(false);
  const [arrangeChainCheckBoxValue, setArrangeChainCheckBoxValue] =
    useState(false);

  const textShowSpamAssets = <p>Display $0.00 assets</p>;
  const textArrangeByChain = <p>Display by Chain</p>;

  const userCtx = useContext(UserContext);

  const handleSpamAssetsCheckboxChange = () => {
    setSpamCheckBoxValue(!spamCheckBoxValue);
  };

  const handleArrangedChainDisplay = () => {
    setArrangeChainCheckBoxValue(!arrangeChainCheckBoxValue);
  };

  const AVAILABLE_CHAINS = {
    ETHEREUM: "ethereum",
    POLYGON: "polygon",
    AVALANCHE: "avalanche",
    ALL_AVAILABLE: "all",
  };

  return (
    <>
      <div className={classes["assets"]}>
        <div className={classes["checkbox-container"]}>
          <div className={classes["chain-checkbox"]}>
            {userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE && (
              <AssettsCheckBox
                handleCheckboxChange={handleArrangedChainDisplay}
                checkboxState={arrangeChainCheckBoxValue}
                text={textArrangeByChain}
              />
            )}
          </div>
          <div className={classes["spam-checkbox"]}>
            <AssettsCheckBox
              handleCheckboxChange={handleSpamAssetsCheckboxChange}
              checkboxState={spamCheckBoxValue}
              text={textShowSpamAssets}
            />
          </div>
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
    </>
  );
};

export default Assets;
