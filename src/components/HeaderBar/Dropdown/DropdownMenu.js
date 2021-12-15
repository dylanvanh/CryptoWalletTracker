
import { useState, useEffect, useRef } from 'react';
import DropDownItem from './DropdownItem';
import classes from './DropdownMenu';
import DropdownItem from './DropdownItem';


import { ReactComponent as BellIcon } from '../../../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../../icons/plus.svg';
import { ReactComponent as CogIcon } from '../../../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../../icons/bolt.svg';

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

export default DropdownMenu;