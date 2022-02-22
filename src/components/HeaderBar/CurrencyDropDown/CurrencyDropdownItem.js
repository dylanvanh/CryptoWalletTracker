import classes from "./CurrencyDropdownItem.module.css";
import UserContext from "../../../context/UserContext";
import { useContext } from "react";

const CurrencyDropdownItem = (props) => {
  const userCtx = useContext(UserContext);

  //handles highlighting selected item
  let cssClassName;
  //default is 1 -> USA on first load
  if (userCtx.selectedCurrencyValue === props.value) {
    cssClassName = "menu-item-selected";
  } else if (userCtx.selectedCurrency === props.name) {
    //change highlighted currency after click
    cssClassName = "menu-item-selected";
  }

  //set the clicked on wallet button to be the globally selcted wallet for displaying
  const activeCurrencyHandler = () => {
    const updatedSelectedCurrency = props.name;

    let updatedCurrencyValue;
    if (updatedSelectedCurrency !== "USD") {
      updatedCurrencyValue = props.value[updatedSelectedCurrency];
    } else {
      updatedCurrencyValue = 1;
    }

    //if selected wallet is the same as currently active
    if (updatedSelectedCurrency === userCtx.selectedCurrency) {
      return;
    }
    userCtx.selectCurrency(updatedSelectedCurrency, updatedCurrencyValue);
  };

  return (
    <div className={classes.container}>
      <a
        href="/#"
        onClick={activeCurrencyHandler}
        className={classes[cssClassName]}
      >
        <span className={classes["icon-button"]}>
          <img src={props.leftIcon} alt='icon'></img>
        </span>
        {props.children}
      </a>
    </div>
  );
};

export default CurrencyDropdownItem;
