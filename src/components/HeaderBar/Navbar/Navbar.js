
import classes from "./Navbar.module.css";
import NavItem from "./NavItem";
import WalletIcon from "../WalletIcon";
import { ReactComponent as CaretIcon } from "../../../icons/caret.svg";
import { ReactComponent as MetamaskIcon } from "../../../icons/metamask.svg";
import { ReactComponent as Ethereum } from "../../../icons/ethereum.svg";
import { useContext } from 'react';

import WalletDropdownMenu from "../WalletDropdown/WalletDropdownMenu";
import UserContext from "../../../context/UserContext";
import ChainDropdownMenu from "../ChainDropdown/ChainDropdownMenu"


const Navbar = () => {

  const userCtx = useContext(UserContext);

  const selectedWallet = userCtx.selectedWallet;


  return (
    <nav className={classes.navbar} >
      <div className={classes["left-nav"]}>
        <WalletIcon />
        <NavItem icon={<CaretIcon />}>
          <WalletDropdownMenu />
        </NavItem>
        <h2 className={classes["dropdown-title"]}>Wallet Details</h2>
        <div className={classes['wallet-name']}>
          <h2>{selectedWallet}</h2>
        </div>
      </div>
      <div className={classes["right-nav"]}>
        <div className={classes["btn"]}>
          <NavItem icon={<Ethereum />}>
            <ChainDropdownMenu />
          </NavItem>
        </div>
        <div>
          <NavItem icon={<MetamaskIcon />} />
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
