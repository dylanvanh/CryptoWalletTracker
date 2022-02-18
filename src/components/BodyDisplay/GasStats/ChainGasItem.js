import classes from "./ChainGasItem.module.css";
import Tortoise from "../../../icons/gwei/tortoise.svg";
import Rabbit from "../../../icons/gwei/rabbit.svg";
import Bird from "../../../icons/gwei/bird.svg";

const ChainGasItem = (props) => {




  let speedIcon
  switch (true) {
    case (props.gwei <= 50):
      speedIcon = Bird;
      break;
    case ((props.gwei > 50) && (props.gwei < 100)):
      speedIcon = Rabbit;
      break;
    case (props.gwei >= 100):
      speedIcon = Tortoise;
      break;
  }


  return (
    <>
      <div className={classes['chain-gas-item']}>
        <img src={props.chainIcon} className={classes['chain-icon']} />
        <div className={classes['gwei']}>
          <p className={classes['gwei-value']}>{props.gwei}</p>
          <p>gwei</p>
        </div>
        <img src={speedIcon} className={classes['speed-icon']} />
      </div>
    </>
  )
}

export default ChainGasItem;