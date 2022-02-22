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
            href="#"
            className={classes["icon-button"]}
            onClick={connectMetaMaskHandler}
          >
            <img src={MetaMaskIcon} />
            <p>MetaMask</p>
          </a>
        </li>
      )}
      {!isMetaMaskInstalled && (
        <li>
          <a
            href="https://metamask.io/download/"
            className={classes["icon-button"]}
          >
            <img src={MetaMaskIcon} />
            <p>MetaMask</p>
          </a>
        </li>
      )}
    </>
  );
};

export default MetaMaskButton;

//on metamask button click
//set the wallet address to that wallet
//if the wallet address is changed in metamask ,add thatwallet too  and set it to that

//only reload on wallet change in e.g. account 1 in metmask to account 2

//on reload always set the wallet address to the one in the localStorage e.g. if it isnt a metmask wallet address
//if the user then clicks on the metamask icon , change the wallet address to the currently selected wallet in metamask
//ignore the chain value that metamask can return
