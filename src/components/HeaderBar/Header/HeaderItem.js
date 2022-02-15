
import classes from "./HeaderItem.module.css";

import { useState } from "react";

const HeaderItem = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <a href="#" className={classes["icon-button"]} onClick={() => setOpen(!open)}>
        <img src={props.icon} />
      </a>
      {open && props.children}
    </li >
  );
}

export default HeaderItem;