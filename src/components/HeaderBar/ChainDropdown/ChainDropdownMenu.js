import classes from './ChainDropdownMenu.module.css';
import ChainDropdownItem from './ChainDropdownItem';

import { ReactComponent as Ethereum } from "../../../icons/ethereum.svg";
import { ReactComponent as Polygon } from "../../../icons/polygon.svg";
import { ReactComponent as Avalanche } from "../../../icons/avalanche.svg";



const ChainDropdownMenu = () => {


  //leftIcons causing error iwth clickable area 
  //->to fix
  return (
    <div className={classes.dropdown}>
      <ChainDropdownItem leftIcon={<Ethereum />} key={'ethereum'} name={'ethereum'}>
        <h3>Ethereum</h3>
      </ChainDropdownItem>
      <ChainDropdownItem leftIcon={<Polygon />} key={'polygon'} name={'polygon'}>
        <h3>Polygon</h3>
      </ChainDropdownItem>
      <ChainDropdownItem leftIcon={<Avalanche />} key={'avalanche'} name={'avalanche'}>
        <h3>Avalanche</h3>
      </ChainDropdownItem>
      <ChainDropdownItem key={'all'} name={'all'}>
        <h3>All</h3>
      </ChainDropdownItem>
    </div>
  );

}

export default ChainDropdownMenu;