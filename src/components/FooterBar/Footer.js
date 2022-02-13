import classes from "./Footer.module.css";
import { ReactComponent as Twitter } from "../../icons/footer/twitter.svg";
import { ReactComponent as Github } from "../../icons/footer/github.svg";
import { ReactComponent as Linkedin } from "../../icons/footer/linkedin.svg";
import { ReactComponent as Figma } from "../../icons/footer/figma.svg";




const Footer = () => {
  return (
    <footer className={classes.footer}>
      <svg viewBox="0 0 100 100"><Twitter /></svg>
      <svg viewBox="0 0 100 100"><Github /></svg>
      <svg viewBox="0 0 100 100"><Linkedin /></svg>
      <svg viewBox="0 0 100 100"> <Figma /></svg>
    </footer>
  );
};

export default Footer;
