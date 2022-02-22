import classes from "./ChainGasItem.module.css";
import TortoiseIcon from "../../../icons/gwei/tortoise.svg";
import RabbitIcon from "../../../icons/gwei/rabbit.svg";
import BirdIcon from "../../../icons/gwei/bird.svg";
import UnknownIcon from "../../../icons/token/questionmark.svg";

const ChainGasItem = (props) => {
  let speedIcon;
  switch (true) {
    case props.gwei <= 50:
      speedIcon = BirdIcon;
      break;
    case props.gwei > 50 && props.gwei < 100:
      speedIcon = RabbitIcon;
      break;
    case props.gwei >= 100:
      speedIcon = TortoiseIcon;
      break;
    default:
      speedIcon = UnknownIcon;
  }

  return (
    <>
      <div className={classes["chain-gas-item"]}>
        <img src={props.chainIcon} className={classes["chain-icon"]} alt="chain-icon" />
        <div className={classes["gwei"]}>
          <p className={classes["gwei-value"]}>{props.gwei}</p>
          <p>gwei</p>
        </div>
        <img src={speedIcon} className={classes["speed-icon"]} alt="gas-speed-icon" />
      </div>
    </>
  );
};

export default ChainGasItem;
