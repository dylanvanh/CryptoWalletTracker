import classes from "./Footer.module.css";
import Button from "../Button";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Button name={'View on etherscan'}/>
    </footer>
  );
};

export default Footer;
