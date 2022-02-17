import classes from './ChainSectionHeader.module.css';
import AllChains from "../../../../icons/chains/all-chains.svg";
import Ethereum from "../../../../icons/chains/ethereum.svg";
import Avalanche from "../../../../icons/chains/avalanche.svg";
import Polygon from "../../../../icons/chains/polygon.svg";
import UnknownChain from "../../../../icons/token/questionmark.svg";
import Token from './Token';

const ChainSectionHeader = (props) => {

  const AVAILABLE_CHAINS = {
    ethereum: "ethereum",
    polygon: "polygon",
    avalanche: "avalanche",
    all_available: "all",
  };

  let chainIcon;
  let chainName;

  switch (props.chain) {
    case AVAILABLE_CHAINS.all_available:
      chainIcon = AllChains;
      chainName = 'All Assets'
      break;
    case AVAILABLE_CHAINS.ethereum:
      chainIcon = Ethereum;
      chainName = 'Ethereum';
      break;
    case AVAILABLE_CHAINS.avalanche:
      chainIcon = Avalanche;
      chainName = 'Avalanche';
      break;
    case AVAILABLE_CHAINS.polygon:
      chainIcon = Polygon;
      chainName = 'Polygon';
      break;
    default:
      chainIcon = UnknownChain;
      chainName = 'Unknown'
  }

  const formattedAmount = '$' + props.value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const dash = ' - ';

  //tokens with prices
  if (!props.spam) {
    return (
      <div className={classes['chain-header']}>
        <img className={classes['chain-image']} src={chainIcon} />
        <p className={classes['title']}>{chainName}</p>
        <p className={classes['dash']}>{dash}</p>
        <p className={classes['amount']}>{formattedAmount}</p>
      </div>
    )
  } else {
    //tokens without prices (spam tokens)
    return (
      <div className={classes['chain-header']}>
        <img className={classes['chain-image']} src={chainIcon} />
        <p className={classes['spam-tokens']}>$0.00 assets</p>
      </div >
    )
  }
}



export default ChainSectionHeader;