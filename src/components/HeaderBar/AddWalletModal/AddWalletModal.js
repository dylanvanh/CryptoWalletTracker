
import { useContext, useRef, useState } from "react";
import UserContext from "../../../context/UserContext";
import MetaMaskButton from "../Header/MetaMaskButton";
import Exit from '../../../icons/modal/exit.svg';
import Submit from '../../../icons/modal/submit.svg';
import classes from "./AddWalletModal.module.css";
import Modal from "./Modal";
import { ethers } from "ethers";

//Wallet add allows you to search for a wallet location and click add 
//Adds the wallet to list of drop down wallets
const AddWalletModal = (props) => {
  const userCtx = useContext(UserContext);

  const walletAddressRef = useRef();
  const [isEnteredWalletValueValid, setIsEnteredWalletValueValid] = useState(true);

  const addNewWalletAddressHandler = (event) => {
    event.preventDefault();
    const enteredWalletAddress = (walletAddressRef.current.value).trim().toLowerCase();

    let validatedWalletAddress;
    try {
      validatedWalletAddress = ethers.utils.getAddress(enteredWalletAddress);
    } catch (e) {
      console.log('Invalid Wallet address entered')
    }

    if (validatedWalletAddress != undefined) {
      userCtx.addWallet(validatedWalletAddress);
      setIsEnteredWalletValueValid(true);
    } else {
      setIsEnteredWalletValueValid(false);
    }
    event.target.reset();
  }
  const addMetaMaskWallet = (walletAddress) => {
    userCtx.addWallet(walletAddress);
  }

  return (
    <Modal>
      <form onSubmit={addNewWalletAddressHandler} className={classes['wallet-modal']}>
        <img className={classes['exit-button']} src={Exit} onClick={userCtx.hideModal} />
        <div className={classes['main-content']}>
          <h1 className={classes['title']}>Connect Wallet</h1>
          <p className={classes['input-header']}>Enter Wallet Address</p>
          {!isEnteredWalletValueValid &&
            <p className={classes['invalid-wallet']}>Invalid wallet entered</p>}
          <div className={classes['input-main']}>
            <input className={classes['address-input']} type='text' ref={walletAddressRef}></input>
            <input className={classes['submit']} src={Submit} type='image' />
          </div>
          <MetaMaskButton addWallet={addMetaMaskWallet} />
        </div>
      </form>
    </Modal>
  )
};

export default AddWalletModal;