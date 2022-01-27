import Card from "../../UI/Card";

const PortfolioSummary = (props) => {
  
  const totalValue = (props.totalValue).toLocaleString('en-US')


  return (
    <Card>
      <h1>Total Value : ${totalValue}</h1>
    </Card>
  );
};

export default PortfolioSummary;
