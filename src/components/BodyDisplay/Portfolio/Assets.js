import classes from "./Assets.module.css";
import Card from "../../UI/Card";
import TokenList from "./TokenList";
import PortfolioSummary from "./PortfolioSummary";
import { useState, useContext } from "react";
import ViewAssettsCheckBox from "./AssetCheckbox";
import UserContext from "../../../context/UserContext";

const Assets = (props) => {

  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [spamCheckBoxValue, setSpamCheckBoxValue] = useState(false);
  const [arrangeChainCheckBoxValue, setArrangeChainCheckBoxValue] = useState(false);

  const textShowSpamAssets = <p>Display $0.00 assets</p>
  const textArrangeByChain = <p>Arrange by Chain</p>

  const userCtx = useContext(UserContext);

  const handleUpdateTotalValue = (value) => {
    setTotalPortfolioValue(value);
  }

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
      <div>
        <PortfolioSummary
          totalValue={totalPortfolioValue} />
      </div>
      <div className={classes.container}>
        <div className={classes.display}>
          <Card>
            <h2 className={classes.title}>Portfolio</h2>
            <ViewAssettsCheckBox handleCheckboxChange={handleSpamAssetsCheckboxChange} checkboxState={spamCheckBoxValue} text={textShowSpamAssets} />
            {userCtx.selectedChain == AVAILABLE_CHAINS.ALL_AVAILABLE &&
              <ViewAssettsCheckBox handleCheckboxChange={handleArrangedChainDisplay} checkboxState={arrangeChainCheckBoxValue} text={textArrangeByChain} />}
            <TokenList tokenData={props.tokenData} portfolioValue={totalPortfolioValue} updateTotalValue={handleUpdateTotalValue} spamCheckBoxValue={spamCheckBoxValue} arrangeChainCheckBoxValue={arrangeChainCheckBoxValue} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Assets;
