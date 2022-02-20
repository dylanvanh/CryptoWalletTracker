import classes from './ChainDropdownMenu.module.css';
import ChainDropdownItem from './ChainDropdownItem';
import Ethereum from "../../../icons/chains/ethereum.svg";
import Polygon from "../../../icons/chains/polygon.svg";
import Avalanche from "../../../icons/chains/avalanche.svg";
import All from "../../../icons/chains/all-chains.svg";

const ChainDropdownMenu = () => {
  return (
    <div className={classes.dropdown}>
      <p>Available Networks</p>
      <ChainDropdownItem leftIcon={Ethereum} key={'ethereum'} name={'ethereum'}>
        <h3>Ethereum</h3>
      </ChainDropdownItem>
      <ChainDropdownItem leftIcon={Polygon} key={'polygon'} name={'polygon'}>
        <h3>Polygon</h3>
      </ChainDropdownItem>
      <ChainDropdownItem leftIcon={Avalanche} key={'avalanche'} name={'avalanche'}>
        <h3>Avalanche</h3>
      </ChainDropdownItem>
      <ChainDropdownItem leftIcon={All} key={'all'} name={'all'}>
        <h3>All</h3>
      </ChainDropdownItem>
    </div>
  );

}

export default ChainDropdownMenu;