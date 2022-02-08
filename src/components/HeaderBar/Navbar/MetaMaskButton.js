import classes from "./MetaMaskButton.module.css";
import { ReactComponent as MetaMaskIcon } from "../../../icons/metamask.svg";

const MetaMaskButton = () => {

  const connectWalletHandler = () => {
    
  }

  return (
    <li>
      <a href="#" className={classes["icon-button"]} onClick={connectWalletHandler}>
        {<MetaMaskIcon />}
      </a>
    </li >
  );
}

export default MetaMaskButton;