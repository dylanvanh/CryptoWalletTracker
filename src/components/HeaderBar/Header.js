import { Fragment } from 'react';
import WalletButton from '../WalletSelectors/WalletButton';
import Title from "./Title";
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div>
          <Title titleName={'Crypto Dashboard'}/>
        </div>
        <div>
          <Title titleName={'Wallet Address'}/>
        </div>
      </div>
      <div className={classes.wallet_button}>
        <WalletButton btnName={'Ethereum'} />
        <WalletButton btnName={'Connect Wallet'} />
      </div>
    </div>
  )
}

export default Header;