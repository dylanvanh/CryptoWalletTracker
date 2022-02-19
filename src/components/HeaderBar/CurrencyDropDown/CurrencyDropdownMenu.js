import classes from './CurrencyDropdownMenu.module.css';
import CurrencyDropdownItem from './CurrencyDropdownItem';
import USA from '../../../icons/currencies/usa.svg';
import ZA from '../../../icons/currencies/za.svg';

const CurrencyDropdownMenu = () => {
  return (
    <div className={classes.dropdown}>
      <p>Available Currencies</p>
      <CurrencyDropdownItem leftIcon={USA} key={'usa'} name={'usa'}>
        <h3>$-Dollar</h3>
      </CurrencyDropdownItem>
      <CurrencyDropdownItem leftIcon={ZA} key={'za'} name={'za'}>
        <h3>R-Rand</h3>
      </CurrencyDropdownItem>
    </div>
  );
}

export default CurrencyDropdownMenu;