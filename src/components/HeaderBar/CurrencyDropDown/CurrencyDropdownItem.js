import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import classes from './CurrencyDropdownItem.module.css';

const CurrencyDropdownItem = (props) => {

  const userCtx = useContext(UserContext);

  //handles highlighting selected item
  let cssClassName;
  console.log(userCtx.selectedCurrency);
  if (userCtx.selectedCurrency == props.name) {
    cssClassName = 'menu-item-selected';
  }


  //set the clicked on wallet button to be the globally selcted wallet for displaying
  const activeCurrencyHandler = () => {

    const updatedSelectedCurrency = props.name;
    const updatedCurrencyValue = props.value[props.name];

    //if selected wallet is the same as currently active
    if (updatedSelectedCurrency === userCtx.selectedCurrency) {
      return;
    }
    userCtx.selectCurrency(updatedSelectedCurrency,updatedCurrencyValue);
  }

  return (
    <div className={classes.container}>
      <a
        href="#"
        onClick={activeCurrencyHandler}
        className={classes[cssClassName]}
      >
        <span className={classes["icon-button"]}><img src={props.leftIcon}></img></span>
        {props.children}
      </a>
    </div>
  );
};


export default CurrencyDropdownItem;