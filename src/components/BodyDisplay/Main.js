import classes from "./Main.module.css";
import Assets from "./Portfolio/Assets";
import ChainGasDisplay from "./GasStats/ChainGasDisplay";
import Footer from "../FooterBar/Footer";
import { ReactComponent as Vault } from "../../icons/vault.svg";


//handles all the body components (BodyDisplay)
const MainDisplay = (props) => {
  return (
    <main className={classes['main']}>
      <section className={classes['top']}>
        <Vault />
        <h1 className={classes['portfolio-title']}>Portfolio</h1>
        <ChainGasDisplay />
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
