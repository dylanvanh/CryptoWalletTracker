import classes from './TokenListTitle.module.css'

const TokenListTitle = () => {

  return (
    <div className={classes['token-titles']}>
      <p className={classes.value}>Value</p>
      <p className={classes.balance}>Balance</p>
      <p className={classes.price}>Price</p>
      <p className={classes['profit-loss']}>24hr P/L</p>
      <p className={classes.chain}>Chain</p>
    </div>
  )
}

export default TokenListTitle;