import { Fragment } from 'react';
import Logo from "./Logo";
import WalletButton from './WalletButton';
import Title from "./Title";
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <div className={classes.headerContainer} >
      <div className={classes.logoContainer}>
        <Logo />
      </div>
      <div className={classes.titleContainer}>
        <Title name={'Crypto Dashboard'} />
        <Title name={'Wallet Address'} />
      </div>
      <div className={classes.buttonContainer}>
        <WalletButton name={'Ethereum'} />
        <WalletButton name={'Connect Wallet'} />
      </div>
    </div>
  )
}

export default Header;