import classes from "./Footer.module.css";
import Twitter from "../../icons/footer/twitter.svg";
import Github from "../../icons/footer/github.svg";
import Linkedin from "../../icons/footer/linkedin.svg";
import Figma from "../../icons/footer/figma.svg";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <a
        href="https://twitter.com/Monkey_incage"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Twitter} />
      </a>
      <a
        href="https://github.com/SparklingWater45/Crypto-Dashboard"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Github} />
      </a>
      <a
        href="https://www.linkedin.com/in/dylan-van-heerden-a7b160139/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Linkedin} />
      </a>
      <a
        href="https://www.figma.com/file/pVftCgx2dEmcLa9s4F7oxN/CryptoDashboardv2?node-id=0%3A1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Figma} />
      </a>
    </footer>
  );
};

export default Footer;
