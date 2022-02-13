import classes from "./Footer.module.css";
// import { ReactComponent as Twitter } from "../../icons/footer/twitter.svg";
// import { ReactComponent as Github } from "../../icons/footer/github.svg";
// import { ReactComponent as Linkedin } from "../../icons/footer/linkedin.svg";
// import { ReactComponent as Figma } from "../../icons/footer/figma.svg";

import Twitter from "../../icons/footer/twitter.svg";
import Github from "../../icons/footer/github.svg";
import Linkedin from "../../icons/footer/linkedin.svg";
import Figma from "../../icons/footer/figma.svg";



const Footer = () => {
  return (
    <footer className={classes.footer}>
      <img src={Twitter} />
      <img src={Github} />
      <img src={Linkedin} />
      <img src={Figma} />
    </footer>
  );
};

export default Footer;
