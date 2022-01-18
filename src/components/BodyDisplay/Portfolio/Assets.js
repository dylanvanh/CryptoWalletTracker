import classes from "./Assets.module.css";
import Card from "../../UI/Card";
import TokenList from "./TokenList";
import PortfolioSummary from "./PortfolioSummary";

const PortfolioDisplay = (props) => {
  return (
    <>
      <div>
        <PortfolioSummary />
      </div>
      <div className={classes.container}>
        <div className={classes.display}>
          <Card>
            <h2 className={classes.title}>Portfolio</h2>
            <TokenList tokenData={props.tokenData} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default PortfolioDisplay;
