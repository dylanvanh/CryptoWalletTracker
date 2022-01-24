import classes from "./PortfolioSummary.css";
import Card from "../../UI/Card";

const PortfolioSummary = (props) => {

  const portfolioValue = props.portfolioValue
  
  return (
    <Card>
      <h1>Total Value : {portfolioValue}</h1>
    </Card>
  );
};

export default PortfolioSummary;
