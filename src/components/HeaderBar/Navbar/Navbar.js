
import classes from "./Navbar.module.css";
import NavItem from './NavItem';
import WalletIcon from '../WalletIcon';
import { ReactComponent as CaretIcon } from '../../../icons/caret.svg'
import DropdownMenu from "../Dropdown/DropdownMenu";


const Navbar = (props) => {
  return (
    <div className={classes.container}>
      <nav className={classes.navbar}>
        <WalletIcon className={classes['wallet-icon']} />
        <ul className={classes["navbar-nav"]}>{props.children}</ul>
        <NavItem icon={<CaretIcon />}>
          <DropdownMenu />
        </NavItem>
        <h2 className={classes['dropdown-title']}>Wallet Details</h2>

      </nav>
    </div>

  );
}

/*
<Navbar>
      <WalletIcon className={classes['wallet-icon']} />
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    
    </Navbar>
*/

export default Navbar;

