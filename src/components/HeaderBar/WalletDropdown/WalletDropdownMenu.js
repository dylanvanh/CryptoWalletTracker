import classes from "./WalletDropdownMenu.module.css";
import { ReactComponent as PlusIcon } from "../../../icons/plus.svg";
import { useContext } from 'react';

import UserContext from "../../../context/UserContext";

import WalletDropdownItem from "./WalletDropdownItem";


const WalletDropdownMenu = (props) => {
  const userCtx = useContext(UserContext);

  const AddWalletButton = (props) => {
    return (
      <a href="#" onClick={userCtx.showModal}>
        <span className={classes["add-wallet-button"]}>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  const dropDownItems = (
    <ul>
      {userCtx.wallets.map((walletAddress) => (
        <WalletDropdownItem className={classes['wallet-address']} key={walletAddress} name={walletAddress}>
          <h3>
            {walletAddress}
          </h3>
        </WalletDropdownItem>
      ))}
    </ul>
  )

  return (
    <div className={classes.dropdown}>
      <div>
        {dropDownItems}
      </div>
      <AddWalletButton leftIcon={<PlusIcon />}>
        <h3>Add Wallet</h3>
      </AddWalletButton>
    </div>
  );
};

export default WalletDropdownMenu;
