import classes from './PortfolioSummary.module.css';
import ArrowUp from '../../../icons/token/arrowupgreen.svg';
import ArrowDown from '../../../icons/token/arrowdownred.svg';
import Ethereum from '../../../icons/chains/ethereum.svg'

const PortfolioSummary = (props) => {

  const portfolioValue = ('$' + (props.portfolioValue).toLocaleString('en-US', { maximumFractionDigits: 2 }));
  let profitLoss = props.profitLoss;
  let arrowImage;
  let percentageDifference;
  let previousDayPortfolioValue = props.portfolioValue + profitLoss;

  //increase
  if (profitLoss >= 0) {
    percentageDifference = (((previousDayPortfolioValue - portfolioValue) / previousDayPortfolioValue) * 100)
    profitLoss = ('+$' + (profitLoss).toLocaleString('en-US', { maximumFractionDigits: 2 }));
    arrowImage = ArrowUp;
    percentageDifference = '+' + percentageDifference.toLocaleString('en-US', { maximumFractionDigits: 1 }) + '%';
  } else {
    //decrease
    profitLoss = ('-$' + (Math.abs(profitLoss)).toLocaleString('en-US', { maximumFractionDigits: 2 }));
    percentageDifference = (((props.portfolioValue - previousDayPortfolioValue) / previousDayPortfolioValue) * 100)
    arrowImage = ArrowDown;
    percentageDifference = '-' + percentageDifference.toLocaleString('en-US', { maximumFractionDigits: 1 }) + '%';
  }

  return (
    <>
      <div className={classes['portfolio-summary']}>
        <div className={classes['top-area']}>
          <div className={classes["top-row"]}>
            <h2 className={classes['balance-title']}>Your Balance</h2>
            <img src={Ethereum} className='chain'></img>
          </div>
          <h1 className={classes['total-value']}>{portfolioValue}</h1>
        </div>
        <div className={classes['bottom-row']}>
          <div className={classes['daily-profit-container']}>
            <h4 className={classes['daily-profit-title']}>Todays Profit</h4>
            <h3 className={classes['daily-profit-amount']}>{profitLoss}</h3>
          </div>
          <div className={classes['daily-percentage-container']}>
            <div className={classes['daily-percentage']}>
              <h5>{percentageDifference}</h5>
              <img src={arrowImage}></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioSummary;
