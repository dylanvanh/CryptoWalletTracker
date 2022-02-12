import classes from "./ChainGasItem.module.css";

const ChainGasItem = (props) => {
  return (
    <>
      <div className={classes['chain-gas-item']}>
        <div className={classes['chain-icon']}>{props.chainIcon}</div>
        <div className={classes['gwei']}>{props.gwei}</div>
        <div className={classes['speed-icon']}>{props.speedIcon}</div>
      </div>
    </>
  )
}

export default ChainGasItem;