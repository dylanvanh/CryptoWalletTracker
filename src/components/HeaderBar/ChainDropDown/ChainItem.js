import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import classes from './ChainItem.module.css';



const ChainItem = (props) => {

  const userCtx = useContext(UserContext);

  return (
    <a href="#" onClick={userCtx.selectedChain()}>
      <span className={classes["add-wallet-button"]}>{props.leftIcon}</span>
      {props.children}
    </a>
  );
}


export default ChainItem;

