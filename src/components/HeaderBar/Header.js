import { Fragment } from 'react';
import WalletIcon from "./WalletIcon";
import WalletButton from './WalletButton';
import Title from "./Title";
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <div className={classes.headerContainer} >
      <div className={classes.iconContainer}>
        <WalletIcon />
        <Title name={'Wallet Address'} />
      </div>
      <div className={classes.titleContainer}>
        <Title name={'Crypto Dashboard'} />
      </div>
      <div className={classes.buttonContainer}>
        <WalletButton name={'Ethereum'} />
        <WalletButton name={'Connect Wallet'} />
      </div>
    </div>
  )
}

export default Header;