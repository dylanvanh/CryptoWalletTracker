import classes from "./PortfolioDisplay.module.css";
import Card from "../../UI/Card";
import WalletSearchBar from "./WalletSearch/WalletSearchBar";

const PortfolioDisplay = () => {
  return (
    <div className={classes.container}>
      <div className={classes.searchbar}>
        <WalletSearchBar />
      </div>
      <div className={classes.display}>
        <Card>
          <h2 className={classes.title}>Portfolio</h2>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioDisplay;
