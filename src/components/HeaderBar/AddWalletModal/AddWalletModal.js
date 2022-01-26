
import { useContext, useRef } from "react";
import UserContext from "../../../context/UserContext";
import classes from "./AddWalletModal.module.css";
import Modal from "./Modal";


//Wallet add allows you to search for a wallet location and click add 
//Adds the wallet to list of drop down wallets
const AddWalletModal = (props) => {
  const userCtx = useContext(UserContext)


  console.log('loading')

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

    console.log(userCtx.wallets)

    if ((userCtx.wallets.includes(enteredWalletAddress)) || (userCtx.wallets == null)) {
      console.log('wallet already added!');
      return
    } else {
      let walletAddresses = userCtx.wallets;
      console.log('wallet Addresses = ', walletAddresses)
      walletAddresses.push(enteredWalletAddress);
      userCtx.addWallet(enteredWalletAddress);
      localStorage.setItem('walletAddresses', JSON.stringify(userCtx.wallets));
    }
  }

  const walletsSavedHandler = () => {
    console.log(userCtx)
    console.log('active wallet address =', userCtx.selectedWallet)
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