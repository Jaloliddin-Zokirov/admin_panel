import React from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { editLang } from "../../Store/Lang/Lang";

const LangToggle = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    if (lang === "ru") {
      dispatch(editLang("uz"));
    } else {
      dispatch(editLang("ru"));
    }
  };

  return (
    <div className={styles.lang} onClick={handleThemeToggle}>
      <p
        className={`${styles.text} ${
          themeList ? styles.lightToggle : styles.darkToggle
        }`}
      >
        {lang === "ru" ? "UZ" : "RU"}
      </p>
    </div>
  );
};

export default LangToggle;
