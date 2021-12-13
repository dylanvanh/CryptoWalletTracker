import classes from "./MainDisplay.module.css";

//Left
import WalletDropDown from "./WalletSelectors/WalletDropdown";
import TransactionsForm from "./TransactionsDisplay/TransactionsForm";

//Middle
import SearchBar from "./WalletSelectors/SearchBar";
import OverviewForm from "./OverviewDisplay/OverviewForm";
import LinkButton from "./OverviewDisplay/LinkButton";

//Right
import AlternateStatsForm from "./AlternateStatsDisplay/AlternateStatsForm";

const MainDisplay = (props) => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.leftContainer}>
        <WalletDropDown />
        <TransactionsForm />
      </div>
      <div className={classes.middleContainer}>
        <SearchBar />
        <OverviewForm />
        <LinkButton />
      </div>
      <div className={classes.rightContainer}>
        <AlternateStatsForm />
      </div>
    </div>


  )
};

export default MainDisplay;