import classes from "./ChainGasItem.module.css";

const ChainGasItem = (props) => {
  return (
    <>
      <div className={classes['chain-gas-item']}>
        <img src={props.chainIcon} className={classes['chain-icon']} />
        <div className={classes['gwei']}>
          <p>{props.gwei}</p>
        </div>
        <img src={props.speedIcon} className={classes['speed-icon']} />
      </div>
    </>
  )
}

export default ChainGasItem;