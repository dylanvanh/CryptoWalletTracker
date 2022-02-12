import classes from "./Main.module.css";
import Assets from "./Portfolio/Assets";
import ChainGasDisplay from "./GasStats/ChainGasDisplay";
import { ReactComponent as Vault } from "../../icons/vault.svg";


//handles all the body components (BodyDisplay)
const MainDisplay = (props) => {
  return (
    <main className={classes["main-container"]}>
      <Vault />
      <h1 className={classes['portfolio-title']}>Portfolio</h1>
      <ChainGasDisplay />
      {/* <section className={classes["Assets-container"]}>
        <Assets tokenData={props.tokenData} />
      </section> */}
    </main>
  );
};

export default MainDisplay;
