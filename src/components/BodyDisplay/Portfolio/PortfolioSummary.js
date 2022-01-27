import Card from "../../UI/Card";

const PortfolioSummary = (props) => {
  
  return (
    <Card>
      <h1>Total Value : ${props.totalValue.toFixed(2)}</h1>
    </Card>
  );
};

export default PortfolioSummary;
