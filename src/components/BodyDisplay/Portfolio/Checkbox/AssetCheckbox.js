import classes from "./AssetCheckbox.module.css";

const AssetCheckbox = (props) => {
  return (
    <div className={classes.checkbox}>
      <div className={classes.title}>{props.text}</div>
      <input
        className={classes.input}
        type="checkbox"
        checked={props.checkboxState}
        onChange={props.handleCheckboxChange}
      ></input>
    </div>
  );
};

export default AssetCheckbox;
