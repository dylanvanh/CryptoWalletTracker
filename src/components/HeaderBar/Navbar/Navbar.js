import classes from "./Navbar.module.css";
import NavItem from "./NavItem";
import WalletIcon from "../WalletIcon";
import { ReactComponent as CaretIcon } from "../../../icons/caret.svg";
import { ReactComponent as MetamaskIcon } from "../../../icons/metamask.svg";
import { ReactComponent as Ethereum } from "../../../icons/ethereum.svg";


import DropdownMenu from "../Dropdown/DropdownMenu";
import Button from "../../Button";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes["left-nav"]}>
        <WalletIcon />
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu />
        </NavItem>
        <h2 className={classes["dropdown-title"]}>Wallet Details</h2>
      </div>
      <div className={classes["right-nav"]}>
        <div className={classes["btn"]}>
          <NavItem icon={<Ethereum />} />
        </div>
        <div className={classes["btn-connect-wallet"]}>
          <NavItem icon={<MetamaskIcon />} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
