import classes from "./CurrencyDropdownMenu.module.css";
import CurrencyDropdownItem from "./CurrencyDropdownItem";
import USA from "../../../icons/currencies/usa.svg";
import ZA from "../../../icons/currencies/za.svg";
const CurrencyDropdownMenu = () => {


  fetchCurrencyData();

  return (
    <div className={classes.dropdown}>
      <p>Available Currencies</p>
      <CurrencyDropdownItem leftIcon={USA} key={"usa"} name={"usa"} value={1}>
        <h3>$-Dollar</h3>
      </CurrencyDropdownItem>
      <CurrencyDropdownItem leftIcon={ZA} key={"za"} name={"za"} value={15}>
        <h3>R-Rand</h3>
      </CurrencyDropdownItem>
    </div>
  );
};

export default CurrencyDropdownMenu;
