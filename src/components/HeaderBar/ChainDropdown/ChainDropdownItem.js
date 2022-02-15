import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import classes from './ChainDropdownItem.module.css';



const ChainDropdownItem = (props) => {
  //onclick should show the stats for the wallet selected

  //potentially just show the walet in the context set to active?
  //-> just change the active to the clicked wallet address

  const userCtx = useContext(UserContext);

  //handles highlighting selected item
  let cssClassName;
  if (userCtx.selectedChain == props.name) {
    cssClassName = 'menu-item-selected';
  }

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
    <div className={classes.container}>
      <a
        href="#"
        onClick={activeChainHandler}
        className={classes[cssClassName]}
      >
        <span className={classes["icon-button"]}><img src={props.leftIcon}></img></span>
        {props.children}
      </a>
    </div>
  );
};


export default ChainDropdownItem;