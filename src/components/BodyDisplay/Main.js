import classes from "./Main.module.css";
import Assets from "./Portfolio/Assets";
import ChainGasDisplay from "./GasStats/ChainGasDisplay";
import Footer from "../FooterBar/Footer";
import Vault from "../../icons/vault.svg";


//handles all the body components (BodyDisplay)
const MainDisplay = (props) => {
  return (
    <main className={classes['main']}>
      <section className={classes['top']}>
        <div className={classes['vault-header']}>
          <img src={Vault} />
          <h1 className={classes['portfolio-title']}>Portfolio</h1>
        </div>
        <div className={classes['portfolio-summary']}>
        </div>
        <div className={classes['gas-stats']}>
          <ChainGasDisplay />
        </div>
      </section>
      <section className={classes['centre']} >
        {/* <section className={classes["Assets-container"]}>
        <Assets tokenData={props.tokenData} />
      </section> */}
      </section>
      <Footer />
    </main>
  );
};

export default MainDisplay;
