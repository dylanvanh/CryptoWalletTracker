import classes from "./Button.module.css"

const Button = (props) => {
  return(
    <button className={classes.btn}>
      <h3>{props.name}</h3>
    </button>
  )
}

export default Button;