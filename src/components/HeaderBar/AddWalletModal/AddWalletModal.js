
import { useContext, useRef } from "react";
import UserContext from "../../../store/UserContext";
import classes from "./AddWalletModal.module.css";
import Modal from "./Modal";


//Wallet add allows you to search for a wallet location and click add 
//Adds the wallet to list of drop down wallets
const AddWalletModal = (props) => {
  const userCtx = useContext(UserContext)

  const walletAddressRef = useRef();

  const addNewWalletAddressHandler = (event) => {
    event.preventDefault();
    const enteredWalletAddress = walletAddressRef.current.value;
    console.log('entered wallet address =', enteredWalletAddress);

    //if blank input field
    if (enteredWalletAddress.trim().length === 0) {
      return
    }
    //closes modal after walletid submitted
    userCtx.hideModal();

    if (userCtx.wallets.includes(enteredWalletAddress)) {
      console.log('wallet already added!');
      return {
      }
    } else {
      userCtx.addWallet(enteredWalletAddress);
    }
  }

  const walletsSavedHandler = () => {
    console.log(userCtx)
  }

  return (
    <Modal>
      <form onSubmit={addNewWalletAddressHandler} className={classes.container}>
        <h1>Add Wallet Address</h1>
        <input type='text' ref={walletAddressRef} ></input>
        <button type="submit">Submit</button>
        <button onClick={userCtx.hideModal}>Close</button>
        <button onClick={walletsSavedHandler}>Show Saved Wallets</button>
      </form>
    </Modal>
  )
};

export default AddWalletModal;