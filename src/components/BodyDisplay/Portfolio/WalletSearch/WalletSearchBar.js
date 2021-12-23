import classes from "./WalletSearchBar.module.css";

const WalletSearchBar = () => {
  return (
    <div className={classes.container}>
      <input type='text' title='ens'></input>
      <button>
        <p>-></p>
      </button>
    </div>
  );
};

export default WalletSearchBar;
