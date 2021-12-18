import { Fragment } from "react";
import classes from "./Header.module.css";
import WalletIcon from "./WalletIcon";

import NavItem from "./Navbar/NavItem";
import { ReactComponent as CaretIcon } from "../../icons/caret.svg";

import Navbar from "./Navbar/Navbar";

const Header = (props) => {
  return(
    <Navbar className={classes.navbar} />
  )
};

export default Header;
