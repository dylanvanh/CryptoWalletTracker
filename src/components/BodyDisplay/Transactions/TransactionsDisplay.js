import { Fragment } from "react";
import classes from "./TransactionsDisplay.module.css";
import Card from "../../UI/Card";

//Shows the latest transactions from the user

const DUMMY_LATEST_TRANSACTIONS = [
  {
    tokenName: "Ohm",
    tokenQuantity: "4.2",
    actionType: "Stake",
  },
  {
    tokenName: "Klima",
    tokenQuantity: "2",
    actionType: "Unstake",
  },
  {
    tokenName: "Ethereum",
    tokenQuantity: "0.2",
    actionType: "Swap",
  },
  {
    tokenName: "Dai",
    tokenQuantity: "200",
    actionType: "Swap",
  },
  {
    tokenName: "Ohm",
    tokenQuantity: "4.2",
    actionType: "Swap",
  },
];

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
