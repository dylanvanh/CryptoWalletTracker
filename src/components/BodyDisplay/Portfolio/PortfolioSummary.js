import classes from './PortfolioSummary.module.css';
import ArrowUp from '../../../icons/token/arrowupgreen.svg';
import ArrowDown from '../../../icons/token/arrowdownred.svg';
import Ethereum from '../../../icons/chains/ethereum.svg'


const PortfolioSummary = (props) => {

  const totalValue = (400000.01).toLocaleString('en-US', { maximumFractionDigits: 2 });

  // const totalValue = ((props.totalValue).toLocaleString('en-US', { maximumFractionDigits: 2 }));

  return (
    <>
      <div className={classes['portfolio-summary']}>
        <div className={classes['top-area']}>
          <div className={classes["top-row"]}>
          <h2 className={classes['balance-title']}>Your Balance</h2>
          <img src={Ethereum} className='chain'></img>
        </div>
          <h1 className={classes['total-value']}>${totalValue}</h1>
      </div>
      <div className={classes['bottom-row']}>
        <div className={classes['daily-profit-container']}>
          <h4 className={classes['daily-profit-title']}>Todays Profit</h4>
          <h3 className={classes['daily-profit-amount']}>+$200.04</h3>
        </div>
        <div className={classes['daily-percentage-container']}>
          <div className={classes['daily-percentage']}>
            <h5>+2.1%</h5>
            <img src={ArrowUp}></img>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PortfolioSummary;
