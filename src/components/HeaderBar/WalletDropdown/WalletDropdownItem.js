import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import classes from './WalletDropdownItem.module.css';
import { ReactComponent as Delete } from "../../../icons/walletdropdown/trash.svg";


const WalletDropdownItem = (props) => {
  const userCtx = useContext(UserContext);

  //set the clicked on wallet button to be the globally selcted wallet for displaying
  const activeWalletHandler = () => {

    const updatedSelectedWallet = props.name;

    console.log(updatedSelectedWallet);

    //if selected wallet is the same as currently active
    if (updatedSelectedWallet === userCtx.selectedWallet) {
      return;
    }
    userCtx.selectWallet(updatedSelectedWallet);
  }

  const deleteWalletHandler = () => {
    const walletToDelete = props.name;

    console.log(walletToDelete);

    userCtx.removeWallet(walletToDelete);
  }

  return (
    <div className={classes.container}>
      <a
        href="#"
        onClick={activeWalletHandler}
        className={classes["menu-item"]}
      >
        <span className={classes["icon-button"]}>{props.leftIcon}</span>
        {props.children}
      </a>
      <a className={classes.delete} onClick={deleteWalletHandler}>
        {<Delete />}
      </a>
    </div>
  );
};

export default WalletDropdownItem;