import classes from "./CurrencyDropdownMenu.module.css";
import CurrencyDropdownItem from "./CurrencyDropdownItem";
import USA from "../../../icons/currencies/usa.svg";
import ZA from "../../../icons/currencies/za.svg";


const CurrencyDropdownMenu = (props) => {

  const data = props.currencyData['data'];
  console.log(data);

  return (
    <div className={classes.dropdown}>
      <p>Available Currencies</p>
      <CurrencyDropdownItem leftIcon={USA} key={'USD'} name={'USD'} value={1}>
        <h3>$-Dollar</h3>
      </CurrencyDropdownItem>
      <CurrencyDropdownItem leftIcon={ZA} key={'ZAR'} name={'ZAR'} value={data}>
        <h3>R-Rand</h3>
      </CurrencyDropdownItem>
    </div>
  );
};

export default CurrencyDropdownMenu;
