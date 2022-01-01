import classes from "./DropdownMenu.module.css";
import { ReactComponent as PlusIcon } from "../../../icons/plus.svg";
import { useContext } from 'react';

import UserContext from "../../../context/UserContext";

import DropdownItem from "./DropDownItem";


const DropdownMenu = (props) => {
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
        <DropdownItem className={classes['wallet-address']} key={walletAddress} name={walletAddress}>
          <h3>
            {walletAddress}
          </h3>
        </DropdownItem>
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

export default DropdownMenu;
