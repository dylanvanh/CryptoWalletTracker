import classes from "./Footer.module.css";
import TwitterIcon from "../../icons/footer/twitter.svg";
import GithubIcon from "../../icons/footer/github.svg";
import LinkedinIcon from "../../icons/footer/linkedin.svg";
import FigmaIcon from "../../icons/footer/figma.svg";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <a
        href="https://twitter.com/Monkey_incage"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={TwitterIcon} alt="twitter" />
      </a>
      <a
        href="https://github.com/SparklingWater45/Crypto-Dashboard"
        target="_blank"
        rel="noopener noreferrer"
        alt="github"
      >
        <img src={GithubIcon} alt="github" />
      </a>
      <a
        href="https://www.linkedin.com/in/dylan-van-heerden-a7b160139/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={LinkedinIcon} alt="linkedin" />
      </a>
      <a
        href="https://www.figma.com/file/pVftCgx2dEmcLa9s4F7oxN/CryptoDashboardv2?node-id=0%3A1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={FigmaIcon} alt="figma" />
      </a>
    </footer>
  );
};

export default Footer;
