import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import classes from './DropDownItem.module.css';

const DropdownItem = (props) => {

  //onclick should show the stats for the wallet selected

  //potentially just show the walet in the context set to active?
  //-> just change the active to the clicked wallet address

  const userCtx = useContext(UserContext);

  //set the clicked on wallet button to be the globally selcted wallet for displaying
  const activeWalletHandler = () => {

    const updatedSelectedWallet = props.name;
    
    console.log(updatedSelectedWallet);

    //if selected wallet is the same as currently active
    if (updatedSelectedWallet == userCtx.selectedWallet) {
      return;
    }
    userCtx.selectWallet(updatedSelectedWallet);
  }

  return (
    <a
      href="#"
      onClick={activeWalletHandler}
      className={classes["menu-item"]}
    >
      <span className={classes["icon-button"]}>{props.leftIcon}</span>
      {props.children}
    </a>
  );
};

export default DropdownItem;