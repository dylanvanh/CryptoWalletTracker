import classes from './PortfolioSummary.module.css';

const PortfolioSummary = (props) => {

  const totalValue = ((props.totalValue).toLocaleString('en-US', { maximumFractionDigits: 2 }));

  return (
    <h1 className={classes['total-value']}>${totalValue}</h1>
  );
};

export default PortfolioSummary;
