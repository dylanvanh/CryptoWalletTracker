import classes from "./DropdownMenu.module.css";
import { Fragment, useState, useEffect, useRef } from "react";

import { ReactComponent as PlusIcon } from "../../../icons/plus.svg";

const DropdownMenu = (props) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  // function calcHeight(el) {
  //   const height = el.offsetHeight;
  //   setMenuHeight(height);
  // }

  const DropdownItem = (props) => {
    return (
      <a
        href="#"
        className={classes["menu-item"]}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className={classes["icon-button"]}>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  };

  return (
    <div className={classes.dropdown}>
      <DropdownItem className={classes["wallet-address"]}>
        <h3>0xx2....B9a</h3>
      </DropdownItem>
      <DropdownItem className={classes["wallet-address"]}>
        <h3>0x31....F1b</h3>
      </DropdownItem>
      <DropdownItem leftIcon={<PlusIcon />}>
        <h3>Add Wallet</h3>
      </DropdownItem>
    </div>
  );
};

export default DropdownMenu;
