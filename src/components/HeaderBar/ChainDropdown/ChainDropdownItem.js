import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import classes from './ChainDropdownItem.module.css';



const ChainDropdownItem = (props) => {
  //onclick should show the stats for the wallet selected

  //potentially just show the walet in the context set to active?
  //-> just change the active to the clicked wallet address

  const userCtx = useContext(UserContext);

  //set the clicked on wallet button to be the globally selcted wallet for displaying
  const activeChainHandler = () => {
    const updatedSelectedChain = props.name;

    //if selected wallet is the same as currently active
    if (updatedSelectedChain === userCtx.selectedChain) {
      return;
    }
    userCtx.selectChain(updatedSelectedChain);
  }

  return (
    <a
      href="#"
      onClick={activeChainHandler}
      className={classes["menu-item"]}
    >
      <span className={classes["icon-button"]}>{props.leftIcon}</span>
      {props.children}
    </a>
  );
};


export default ChainDropdownItem;