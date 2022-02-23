import AssetCheckbox from "./AssetCheckbox";
import classes from "./AssetOptionsMenu.module.css";
import { useContext } from "react";
import UserContext from "../../../../context/UserContext";

const AssetOptionsMenu = (props) => {
  const userCtx = useContext(UserContext);
  const textShowSpamAssets = (
    <p>Display {userCtx.selectedCurrencySymbol}0.00 assets</p>
  );
  const textArrangeByChain = <p>Display by Chain</p>;

  const AVAILABLE_CHAINS = {
    ETHEREUM: "ethereum",
    POLYGON: "polygon",
    AVALANCHE: "avalanche",
    ALL_AVAILABLE: "all",
  };

  return (
    <>
      <div className={classes["checkboxes"]}>
        <div className={classes["chain-checkbox"]}>
          {userCtx.selectedChain === AVAILABLE_CHAINS.ALL_AVAILABLE && (
            <AssetCheckbox
              handleCheckboxChange={props.handleArrangedChainDisplay}
              checkboxState={props.arrangeChainCheckBoxValue}
              text={textArrangeByChain}
            />
          )}
        </div>
        <div className={classes["spam-checkbox"]}>
          <AssetCheckbox
            handleCheckboxChange={props.handleSpamAssetsCheckboxChange}
            checkboxState={
              props.handleSpamAssetsCheckboxChangespamCheckBoxValue
            }
            text={textShowSpamAssets}
          />
        </div>
      </div>
    </>
  );
};

export default AssetOptionsMenu;
