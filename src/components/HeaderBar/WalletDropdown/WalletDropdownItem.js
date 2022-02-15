import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import classes from './WalletDropdownItem.module.css';
// import { ReactComponent as Delete } from "../../../icons/walletdropdown/trash.svg";
import Delete from "../../../icons/walletdropdown/trash.svg";



const WalletDropdownItem = (props) => {
  const userCtx = useContext(UserContext);


  //handles highlighting selected item
  let cssClassName;
  if (userCtx.selectedWallet == props.name) {
    cssClassName = 'menu-item-selected';
  }

  //set the clicked on wallet button to be the globally selcted wallet for displaying
  const activeWalletHandler = () => {

    const updatedSelectedWallet = props.name;
    //if selected wallet is the same as currently active
    if (updatedSelectedWallet === userCtx.selectedWallet) {
      return;
    }
    userCtx.selectWallet(updatedSelectedWallet);
  }

  const deleteWalletHandler = () => {
    const walletToDelete = props.name;
    userCtx.removeWallet(walletToDelete);
  }

  return (
    <div className={classes.container}>
      <a
        href="#"
        onClick={activeWalletHandler}
        className={classes[cssClassName]}
      >
        <span className={classes["icon-button"]}><img src={props.leftIcon}></img></span>
        {props.children}
      </a>
      <a className={classes.delete}>
        <img onClick={deleteWalletHandler} src={Delete}></img>
      </a>
    </div>
  );
};

export default WalletDropdownItem;