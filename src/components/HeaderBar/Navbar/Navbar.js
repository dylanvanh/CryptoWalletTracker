
import classes from "./Navbar.module.css";
import NavItem from "./NavItem";
import WalletIcon from "../WalletIcon";
import { ReactComponent as CaretIcon } from "../../../icons/caret.svg";
import { ReactComponent as MetamaskIcon } from "../../../icons/metamask.svg";
import { ReactComponent as Ethereum } from "../../../icons/ethereum.svg";
import { useContext } from 'react';

import DropdownMenu from "../Dropdown/DropdownMenu";
import UserContext from "../../../context/UserContext";

const Navbar = (props) => {

  const userCtx = useContext(UserContext);

  const selectedWallet = userCtx.selectedWallet;

  const areWalletsEmtpy = userCtx.wallets == null; 

  console.log(areWalletsEmtpy)

  return (
    <nav className={classes.navbar} >
      <div className={classes["left-nav"]}>
        <WalletIcon />
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu areWalletsEmtpy={areWalletsEmtpy} />
        </NavItem>
        <h2 className={classes["dropdown-title"]}>Wallet Details</h2>
        <div className={classes['wallet-name']}>
          <h2>{selectedWallet}</h2>
        </div>
      </div>
      <div className={classes["right-nav"]}>
        <div className={classes["btn"]}>
          <NavItem icon={<Ethereum />} />
        </div>
        <div>
          <NavItem icon={<MetamaskIcon />} />
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
