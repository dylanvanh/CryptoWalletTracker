
import { useContext } from "react";
import UserContext from "../../../store/UserContext";
import classes from "./AddWalletModal.module.css";
import Modal from "./Modal";


//Wallet add allows you to search for a wallet location and click add 
//Adds the wallet to list of drop down wallets
const AddWallet = (props) => {

  const userCtx = useContext(UserContext)
  return (
    <Modal>
      <div className={classes.con}>
        <h1>Add Wallet Address</h1>
        <input type='text'></input>
        <button onClick={userCtx.hideModal}>Close</button>
      </div>
    </Modal>
  )
};

export default AddWallet;