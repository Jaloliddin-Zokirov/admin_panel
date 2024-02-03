import React from "react";
import styles from "./Home.module.scss";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { themeList } = useSelector((state) => state.theme);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section
          className={`${styles.navbar} ${
            themeList ? styles.light : styles.dark
          }`}
        >
          <Navbar theme={themeList} />
        </section>
        <section className={styles.outlet}>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Home;
