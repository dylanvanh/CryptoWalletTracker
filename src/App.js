import { Fragment, useState, useEffect, useRef } from 'react'
import classes from "./App.module.css"
import Header from "./components/HeaderBar/Header"
import MainDisplay from "./components/BodyDisplay/MainDisplay";
import WalletIcon from "./components/HeaderBar/WalletIcon";


import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';


function App() {


  return (

    <Header></Header>
    // <Navbar>
    //   <WalletIcon className={classes['wallet-icon']} />
    //   <NavItem icon={<CaretIcon />}>
    //     <DropdownMenu />
    //   </NavItem>
    //   <h2 className={classes['dropdown-title']}>Wallet Details</h2>
    // </Navbar>
  );

}

function Navbar(props) {
  return (
    <nav className={classes.navbar}>
      <ul className={classes["navbar-nav"]}>{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className={classes["icon-button"]} onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}


function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  // }, [])

  // function calcHeight(el) {
  //   const height = el.offsetHeight;
  //   setMenuHeight(height);
  // }

  function DropdownItem(props) {
    return (
      <a href="#" className={classes["menu-item"]} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className={classes["icon-button"]}>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className={classes.dropdown}>
      <DropdownItem className={classes["wallet-address"]}>
        <h3>0xx2....B9a</h3>
      </DropdownItem>
      <DropdownItem
        leftIcon={<PlusIcon />}
      >
        <h3>Add Wallet</h3>
      </DropdownItem>
    </div>
  );
}

export default App;
