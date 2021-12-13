import classes from "./Title.module.css";

const Title = (props) => {
  return (
    <p className={classes.title}>{props.name}</p>
  )
};

export default Title;