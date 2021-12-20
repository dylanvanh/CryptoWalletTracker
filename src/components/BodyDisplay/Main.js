import classes from "./Main.module.css";
import { Fragment } from "react";

const MainDisplay = () => {
  return (
    <div className={classes["whole-container"]}>
      <div className={classes["left-container"]}></div>
      <div className={classes["middle-container"]}></div>
      <div classNAme={classes["right-container"]}></div>
    </div>
  );
};

export default MainDisplay;
