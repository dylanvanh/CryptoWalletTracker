import classes from './ChainDropdownMenu.module.css';
import ChainDropdownItem from './ChainDropdownItem';

import { ReactComponent as Ethereum } from "../../../icons/ethereum.svg";
import { ReactComponent as Polygon } from "../../../icons/polygon.svg";
import { ReactComponent as Avalanche } from "../../../icons/avalanche.svg";



const ChainDropdownMenu = () => {

  /*
  const availableChains = {
  ETHEREUM: 'eth',
  POLYGON: 'polygon',
  AVALANCHE: 'avalanche',
  ALL_AVAILABLE: 'all',
}
*/

  return (
    <div className={classes.dropdown}>
      <ChainDropdownItem leftIcon={<Ethereum />} key={'eth'} name={'ethereum'}>
        <h3>Ethereum</h3>
      </ChainDropdownItem>
      <ChainDropdownItem leftIcon={<Polygon />} key={'polygon'} name={'polygon'}>
        <h3>Polygon</h3>
      </ChainDropdownItem>
      <ChainDropdownItem leftIcon={<Avalanche />} key={'avalanche'} name={'avalanche'}>
        <h3>Avalance</h3>
      </ChainDropdownItem>
    </div>
  );

}

export default ChainDropdownMenu;