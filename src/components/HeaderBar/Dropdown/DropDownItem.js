
import classes from './DropDownItem.module.css';

const DropdownItem = (props) => {
  return (
    <a
      href="#"
      className={classes["menu-item"]}
    // onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
    >
      <span className={classes["icon-button"]}>{props.leftIcon}</span>
      {props.children}
    </a>
  );
};

export default DropdownItem;