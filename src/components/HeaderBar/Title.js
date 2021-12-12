import classes from "./Title.module.css";

const Title = (props) => {
  return (
    <p className={classes.title_name}>{props.titleName}</p>
  )
};

export default Title;