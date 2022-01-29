import classes from './ChainDropdownMenu.module.css';
import ChainItem from './ChainItem';


const ChainDropdownMenu = () => {

  return (
    <div className={classes.dropdown}>
      <ChainItem>
        <h3>Add Wallet</h3>
      </ChainItem>
    </div>
  );

}

export default ChainDropdownMenu;