import classes from "./DropdownMenu.module.css";
import { ReactComponent as PlusIcon } from "../../../icons/plus.svg";
import { useContext } from 'react';

import UserContext from "../../../store/UserContext";

import DropdownItem from "./DropDownItem";


const DropdownMenu = (props) => {
  const userCtx = useContext(UserContext);

  const AddWalletButton = (props) => {
    return (
      <a>
        <span onClick={userCtx.showModal} className={classes["add-wallet-button"]}>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  const dropDownItems = (
    <ul>
      {userCtx.wallets.map((walletAddress) => (
        <DropdownItem className={classes['wallet-address']}>
          <h3>{walletAddress}</h3>
        </DropdownItem>
      ))}
    </ul>
  )

  return (
    <div className={classes.dropdown}>
      {dropDownItems}
      <AddWalletButton leftIcon={<PlusIcon />}>
        <h3>Add Wallet</h3>
      </AddWalletButton>
    </div>
  );
};

export default DropdownMenu;
