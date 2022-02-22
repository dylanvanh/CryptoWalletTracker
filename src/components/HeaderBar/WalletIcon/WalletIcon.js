import classes from './WalletIcon.module.css';
import { useContext } from 'react';
import BlockieImage from './BlockieImage';
import UserContext from '../../../context/UserContext';

const WalletIcon = () => {

  const userCtx = useContext(UserContext);

  return (
    <div className={classes['wallet-icon']}>
      <BlockieImage address={userCtx.selectedWallet} diameter={50} />
    </div>
  )
}

export default WalletIcon;