import classes from "./ChainGasDisplay.module.css";
import ChainGasItem from "./ChainGasItem";

import { ReactComponent as Ethereum } from "../../../icons/chains/ethereum.svg";
import { ReactComponent as Polygon } from "../../../icons/chains/polygon.svg";
import { ReactComponent as Avalanche } from "../../../icons/chains/avalanche.svg";

import { ReactComponent as Tortoise } from "../../../icons/gwei/tortoise.svg";
import { ReactComponent as Rabbit } from "../../../icons/gwei/rabbit.svg";
import { ReactComponent as Bird } from "../../../icons/gwei/bird.svg";


const eth = '300 gwei';
const poly = '100 gwei';
const avax = '20 gwei';



const ChainGasDisplay = () => {
  return (
    <div className={classes['gas-stats']}>
      <h2 className={classes.title}>Gas Stats</h2>
      {/* <ChainGasItem chainIcon={<Ethereum />} gwei={eth} speedIcon={<Tortoise />} />
      <ChainGasItem chainIcon={<Polygon />} gwei={poly} speedIcon={<Rabbit />} />
      <ChainGasItem chainIcon={<Avalanche />} gwei={avax} speedIcon={<Bird />} /> */}
    </div>
  );
};

export default ChainGasDisplay;
