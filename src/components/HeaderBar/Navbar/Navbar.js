import classes from "./Navbar.module.css";
import NavItem from "./NavItem";
import WalletIcon from "../WalletIcon";
import { ReactComponent as CaretIcon } from "../../../icons/caret.svg";
import DropdownMenu from "../Dropdown/DropdownMenu";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <WalletIcon/>
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
      <h2 className={classes["dropdown-title"]}>Wallet Details</h2>
    </nav>
  );
};

export default Navbar;
