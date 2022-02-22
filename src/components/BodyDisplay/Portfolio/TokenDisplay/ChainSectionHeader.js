import classes from "./ChainSectionHeader.module.css";
import AllChainsIcon from "../../../../icons/chains/all-chains.svg";
import EthereumIcon from "../../../../icons/chains/ethereum.svg";
import AvalancheIcon from "../../../../icons/chains/avalanche.svg";
import PolygonIcon from "../../../../icons/chains/polygon.svg";
import UnknownChainIcon from "../../../../icons/token/questionmark.svg";
import UserContext from "../../../../context/UserContext";
import { useContext } from "react";

const ChainSectionHeader = (props) => {
  const AVAILABLE_CHAINS = {
    ethereum: "ethereum",
    polygon: "polygon",
    avalanche: "avalanche",
    all_available: "all",
  };

  const userCtx = useContext(UserContext);
  let chainIcon;
  let chainName;

  switch (props.chain) {
    case AVAILABLE_CHAINS.all_available:
      chainIcon = AllChainsIcon;
      chainName = "All Assets";
      break;
    case AVAILABLE_CHAINS.ethereum:
      chainIcon = EthereumIcon;
      chainName = "Ethereum";
      break;
    case AVAILABLE_CHAINS.avalanche:
      chainIcon = AvalancheIcon;
      chainName = "Avalanche";
      break;
    case AVAILABLE_CHAINS.polygon:
      chainIcon = PolygonIcon;
      chainName = "Polygon";
      break;
    default:
      chainIcon = UnknownChainIcon;
      chainName = "Unknown";
  }

  const formattedAmount =
    userCtx.selectedCurrencySymbol +
    props.value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const dash = " - ";

  //tokens with prices
  if (!props.spam) {
    return (
      <div className={classes["chain-header"]}>
        <img
          className={classes["chain-image"]}
          src={chainIcon}
          alt="chain-icon"
        />
        <p className={classes["title"]}>{chainName}</p>
        <p className={classes["dash"]}>{dash}</p>
        <p className={classes["amount"]}>{formattedAmount}</p>
      </div>
    );
  } else {
    //tokens without prices (spam tokens)
    return (
      <div className={classes["chain-header"]}>
        <img
          className={classes["chain-image"]}
          src={chainIcon}
          alt="chain-icon"
        />
        <p className={classes["spam-tokens"]}>$0.00 assets</p>
      </div>
    );
  }
};

export default ChainSectionHeader;
