import classes from "./MetaMaskButton.module.css";
import MetaMaskIcon from "../../../icons/modal/metamask.svg";
import { useState, useEffect } from "react";

const MetaMaskButton = (props) => {
  const [isMetaMaskInstalled, setisMetaMaskInstalled] = useState(false);

  useEffect(() => {
    const checkForMetaMask = () => {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        setisMetaMaskInstalled(true);
      } else {
        console.log("MetaMask is not installed!");
      }
    };
    checkForMetaMask();
  }, []);

  const connectMetaMaskHandler = async (event) => {
    event.preventDefault();
    const walletAddresses = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    //add the new wallet address to the list of wallet addresses
    props.addWallet(walletAddresses[0]);
  };

  return (
    <>
      {isMetaMaskInstalled && (
        <li className={classes["list"]}>
          <a
            href="/#"
            className={classes["icon-button"]}
            onClick={connectMetaMaskHandler}
          >
            <img src={MetaMaskIcon} alt='metamask-icon' />
            <p>MetaMask</p>
          </a>
        </li>
      )}
      {!isMetaMaskInstalled && (
        <li className={classes['list']}>
          <a
            href="https://metamask.io/download/"
            className={classes["icon-button"]}
          >
            <img src={MetaMaskIcon} alt='metamask-icon' />
            <p>MetaMask</p>
          </a>
        </li>
      )}
    </>
  );
};

export default MetaMaskButton;