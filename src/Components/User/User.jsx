import React from "react";
import { useSelector } from "react-redux";

const User = () => {
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);

  return <div>{lang === "ru" ? "Лицо страницa" : "Yuz qismi"}</div>;
};

export default User;
