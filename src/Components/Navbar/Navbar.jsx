import React from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ theme }) => {
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className={`${styles.navbar} ${theme ? styles.light : styles.dark}`}>
      <div className={styles.top}>
        <Link className={styles.link} to={""}>
          {lang === "ru" ? "Дом" : "Uy"}
        </Link>
        <Link className={styles.link} to={"phone-insta"}>
          {lang === "ru" ? "Телефон && Инстаграм" : "Telefon && Instagram"}
        </Link>
        <Link className={styles.link} to={"logo"}>
          {lang === "ru" ? "Логотип" : "Logotip"}
        </Link>
        <Link className={styles.link} to={"hero"}>
          {lang === "ru" ? "Интерфейс" : "Interfeys"}
        </Link>
        <Link className={styles.link} to={"user"}>
          {lang === "ru" ? "Голоса" : "Ovozlar"}
        </Link>
      </div>
      <div className={styles.bottom}>
        <span className={styles.line}></span>
        <Link className={styles.link__bottom} to={"support"}>
          {lang === "ru" ? "Поддерживать" : "Qo'llab-quvvatlash"}
        </Link>
        <Link className={styles.link__bottom} to={"settings"}>
          {lang === "ru" ? "Настройки" : "Sozlamalar"}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
