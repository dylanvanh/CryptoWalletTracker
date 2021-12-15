import { useState, useRef } from 'react';

import classes from './DropdownItem.module.css';


const DropdownItem = (props) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  return (
    <a href="#" className={classes["menu-item"]} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
      <span className={classes["icon-button"]}>{props.leftIcon}</span>
      {props.children}
    </a>
  );
}

export default DropdownItem;