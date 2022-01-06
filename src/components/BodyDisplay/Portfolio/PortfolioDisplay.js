import classes from "./PortfolioDisplay.module.css";
import Card from "../../UI/Card";

const PortfolioDisplay = (props) => {

  return (
    <div className={classes.container}>
      <div className={classes.searchbar}>
      </div>
      <div className={classes.display}>
        <Card>
          <h2 className={classes.title}>Portfolio</h2>
          <p>{props.tokenData}</p>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioDisplay;
