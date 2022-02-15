
import classes from "./Header.module.css";
import HeaderItem from "./HeaderItem";
import WalletIcon from "../WalletIcon";
import CaretIcon from "../../../icons/headerbar/caret.svg";
import Network from "../../../icons/headerbar/network.svg";
import Currency from "../../../icons/currencies/currency.svg";


import AllChains from '../../../icons/chains/all-chains.svg';
import Ethereum from '../../../icons/chains/ethereum.svg'
import Avalanche from '../../../icons/chains/avalanche.svg'
import Polygon from '../../../icons/chains/polygon.svg'

import { useContext } from 'react';

import WalletDropdownMenu from "../WalletDropdown/WalletDropdownMenu";
import UserContext from "../../../context/UserContext";
import ChainDropdownMenu from "../ChainDropdown/ChainDropdownMenu"

const Header = () => {

  const userCtx = useContext(UserContext);

  const selectedWallet = userCtx.selectedWallet;


  // const handleClick = (event) => {
  //   event.preventDefault();
  //   console.log(userCtx)
  // }

  let chainIcon;

  switch (userCtx.selectedChain) {
    case 'ethereum':
      chainIcon = Ethereum;
      break;
    case 'avalanche':
      chainIcon = Avalanche;
      break;
    case 'polygon':
      chainIcon = Polygon;
      break;
    case 'all':
      chainIcon = AllChains;
  }


  return (
    <nav className={classes.header} >
      <div className={classes['wallet-div']}>
        <WalletIcon />
        <HeaderItem icon={CaretIcon}>
          <WalletDropdownMenu />
        </HeaderItem>
        <h2>Wallets</h2>
      </div>
      <h2 className={classes['wallet-address']}>{selectedWallet}</h2>
      <div className={classes['end-dropdowns']}>
        <h3>Networks</h3>
        <HeaderItem icon={Network}>
          <ChainDropdownMenu />
        </HeaderItem>
        <h3>Currencies</h3>
        <HeaderItem icon={Currency}>
        </HeaderItem>
      </div>
    </nav >
  );
};

export default Header;
