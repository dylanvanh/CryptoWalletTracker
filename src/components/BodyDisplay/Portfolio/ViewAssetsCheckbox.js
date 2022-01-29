import { useState } from "react";
import classes from './ViewAssetsCheckbox.module.css';

const ViewAssettsCheckBox = (props) => {

  return (
    <div className={classes.container}>
      <input type="checkbox"
        checked={props.checkboxState}
        onChange={props.handleCheckboxChange}
      >
      </input>
      <p>Display $0.00 assets</p>
    </div>
  )
}

export default ViewAssettsCheckBox;