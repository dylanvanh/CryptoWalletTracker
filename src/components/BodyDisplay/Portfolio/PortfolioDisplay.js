import classes from "./PortfolioDisplay.module.css";
import Card from "../../UI/Card";
import TokenList from "./TokenList";

const PortfolioDisplay = (props) => {

  return (
    <div className={classes.container}>
      <div className={classes.searchbar}>
      </div>
      <div className={classes.display}>
        <Card>
          <h2 className={classes.title}>Portfolio</h2>
          <TokenList tokenData={props.tokenData}/>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioDisplay;
