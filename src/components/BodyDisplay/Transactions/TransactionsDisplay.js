import classes from "./TransactionsDisplay.module.css";
import Card from "../../UI/Card";

//Shows the latest transactions from the user
const TransactionsDisplay = () => {
  return (
    <div className={classes.container}>
      <Card>
        <h2 className={classes.title}>Latest Transactions</h2>
      </Card>
    </div>
  );
};

export default TransactionsDisplay;
