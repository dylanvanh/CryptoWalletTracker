import { createContext } from "react";

const UserContext = createContext({
  //Can leave the object blank , just helps with autocompletion when referencing the UserContext component
  wallets: [],
  isModalShowing: false,
  selectedWallet: null,
  selectedChain: null,
  selectedCurrency: null,
  selectedCurrencyValue: null,
  selectedCurrencySymbol: null,
  showModal: () => { },
  hideModal: () => { },
  addWallet: (walletAddress) => { },
  removeWallet: (walletAddress) => { },
  selectWallet: (walletAddress) => { },
  selectChain: (chainName) => { },
  selectCurrency: (currencyName, currencyValue) => { },
});

export default UserContext;