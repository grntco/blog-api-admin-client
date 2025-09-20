import ghIcon from "../../assets/icons/github-mark.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.info}>
          <span>Grant Collins © {new Date().getFullYear()}</span>
          <a href="https://github.com/grntco">
            <img src={ghIcon} alt="GitHub Octacat icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
