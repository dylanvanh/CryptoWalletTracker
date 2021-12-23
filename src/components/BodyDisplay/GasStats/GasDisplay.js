import classes from "./GasDisplay.module.css";
import Card from "../../UI/Card";

const GasDisplay = () => {
  return (
    <div className={classes.container}>
      <Card>
        <h2 className={classes.title}>Gas Stats</h2>
      </Card>
    </div>
  );
};

export default GasDisplay;
