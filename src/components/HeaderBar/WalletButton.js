import { Fragment } from "react";
import classes from './WalletButton.module.css';

const WalletButton = (props) => {

  return (
    <Fragment>
      <button className={classes.btn}>
        {props.name}
      </button>
    </Fragment>
  )
}

export default WalletButton;