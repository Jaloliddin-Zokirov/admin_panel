import React from "react";
import styles from "./Header.module.scss";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { useSelector } from "react-redux";
import LogoWrite from "../../Store/Logo/LogoWrite";
import { Link } from "react-router-dom";
import { Forimage } from "../../server/api";

const Header = () => {
  LogoWrite();
  const { themeList } = useSelector((state) => state.theme);
  const { logoList } = useSelector((state) => state.logo);

  return (
    <header
      className={`${styles.header} ${themeList ? styles.light : styles.dark}`}
    >
      <div className="container">
        <div className={styles.header__box}>
          <Link to="/">
            {logoList !== undefined ? (
              <img
                width={45}
                height={45}
                src={`${Forimage}${logoList.light}`}
                alt={logoList.title}
              />
            ) : (
              <></>
            )}
          </Link>
          <div className={styles.header__toggle}>
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
