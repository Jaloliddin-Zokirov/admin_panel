import React from "react";
import styles from "./Loading.module.scss";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

function PreLoader1({ theme }) {
  return (
    <>
      <ReactLoading
        type={"bars"}
        color={theme ? "#0F0F0F" : "#B8B8B8"}
        height={100}
        width={100}
      />
    </>
  );
}

const Loading = () => {
  const { themeList } = useSelector((state) => state.theme);
  return (
    <div className={themeList ? styles.loading__box : styles.loading__boxDark}>
      <div className={styles.root}>
        <PreLoader1 theme={themeList} />
      </div>
    </div>
  );
};

export default Loading;
