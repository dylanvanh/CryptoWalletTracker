import classes from "./DropdownMenu.module.css";
import { ReactComponent as PlusIcon } from "../../../icons/plus.svg";
import { useContext } from 'react';

import UserContext from "../../../store/UserContext";

import DropdownItem from "./DropDownItem";


const DropdownMenu = (props) => {
  //Opens a modal for adding the wallet, 
  //where the user can enter the details of the new added wallet
  const AddWalletButton = (props) => {

    const userCtx = useContext(UserContext);

    return (
      <a>
        <span onClick={userCtx.showModal} className={classes["add-wallet-button"]}>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  // return (
  //   <div className={classes.dropdown}>
  // { userCtx.walletAddresses.map() }
  //     <AddWalletButton onClick={ } leftIcon={<PlusIcon />}>
  //       <h3>Add Wallet</h3>
  //     </AddWalletButton>
  //   </div>
  // );

  return (
    <div className={classes.dropdown}>
      <DropdownItem className={classes["wallet-address"]}>
        <h3>0xx2....B9a</h3>
      </DropdownItem>
      <DropdownItem className={classes["wallet-address"]}>
        <h3>0x31....F1b</h3>
      </DropdownItem>
      <AddWalletButton leftIcon={<PlusIcon />}>
        <h3>Add Wallet</h3>
      </AddWalletButton>
    </div>
  );
};

export default DropdownMenu;
