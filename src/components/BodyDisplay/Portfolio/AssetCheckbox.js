import classes from './AssetCheckbox.module.css';

const AssetCheckbox = (props) => {
  return (
    <div className={classes.container}>
      <input type="checkbox"
        checked={props.checkboxState}
        onChange={props.handleCheckboxChange}
      >
      </input>
      {props.text}
    </div>
  )
}

export default AssetCheckbox;