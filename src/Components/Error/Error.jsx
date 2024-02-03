import React, { useEffect, useState } from "react";
import styles from "./Error.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Error = () => {
  const { errorList } = useSelector((state) => state.error);
  const { lang } = useSelector((state) => state.lang);
  const { theme } = useSelector((state) => state.theme);
  const [error, setError] = useState();

  useEffect(() => {
    setError(errorList);
  }, [errorList]);

  if (!error || !error.response || !error.response.status) {
    return (
      <div className={theme ? styles.error : styles.errorDark}>
        <h2 className={styles.title}>Oops...</h2>
        <p className={styles.message}>An unexpected error occurred.</p>
        <Link to="/" className={styles.link}>
          {lang === "ru" ? "Домашняя страница" : "Bosh saxifa"}
        </Link>
      </div>
    );
  }

  if (error.response.status === 404) {
    return (
      <div
        className={`${styles.error404} ${
          theme ? styles.error : styles.errorDark
        }`}
      >
        <h2 className={styles.title}>Oops...</h2>
        <p className={styles.message}>{error.message}</p>
        <p className={styles.statusText}>{error.response.statusText}</p>
        <Link to="/" className={styles.link}>
          {lang === "ru" ? "Домашняя страница" : "Bosh saxifa"}
        </Link>
      </div>
    );
  } else {
    return (
      <div className={theme ? styles.error : styles.errorDark}>
        <h2 className={styles.title}>Oops...</h2>
        <p className={styles.message}>{error.message}</p>
        <p className={styles.statusText}>{error.response.statusText}</p>
        <Link to="/" className={styles.link}>
          {lang === "ru" ? "Домашняя страница" : "Bosh saxifa"}
        </Link>
      </div>
    );
  }
};

export default Error;
