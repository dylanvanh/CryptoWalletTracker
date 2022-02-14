import classes from "./Assets.module.css";
import Card from "../../UI/Card";
import TokenList from "./TokenList";
import { useState, useContext } from "react";
import ViewAssettsCheckBox from "./AssetCheckbox";
import UserContext from "../../../context/UserContext";

const Assets = (props) => {

  const [spamCheckBoxValue, setSpamCheckBoxValue] = useState(false);
  const [arrangeChainCheckBoxValue, setArrangeChainCheckBoxValue] = useState(false);

  const textShowSpamAssets = <p>Display $0.00 assets</p>
  const textArrangeByChain = <p>Arrange by Chain</p>

  const userCtx = useContext(UserContext);

  const handleSpamAssetsCheckboxChange = () => {
    setSpamCheckBoxValue(!spamCheckBoxValue);
  }

  const handleArrangedChainDisplay = () => {
    setArrangeChainCheckBoxValue(!arrangeChainCheckBoxValue);
  }

  const AVAILABLE_CHAINS = {
    ETHEREUM: "ethereum",
    POLYGON: "polygon",
    AVALANCHE: "avalanche",
    ALL_AVAILABLE: "all",
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container}>
          <div className={classes.display}>
            <Card>
              <div className={classes['checkbox-container']}>
                <ViewAssettsCheckBox handleCheckboxChange={handleSpamAssetsCheckboxChange} checkboxState={spamCheckBoxValue} text={textShowSpamAssets} />
              </div>
              {userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE &&
                <ViewAssettsCheckBox handleCheckboxChange={handleArrangedChainDisplay} checkboxState={arrangeChainCheckBoxValue} text={textArrangeByChain} />}
              <TokenList
                tokenData={props.tokenData}
                portfolioValue={props.portfolioValue} updateTotalValue={props.updateTotalValue}
                dailyProfitLoss={props.dailyProfitLoss} updateDailyProfitLoss={props.updateDailyProfitLoss}
                spamCheckBoxValue={spamCheckBoxValue} arrangeChainCheckBoxValue={arrangeChainCheckBoxValue}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assets;
