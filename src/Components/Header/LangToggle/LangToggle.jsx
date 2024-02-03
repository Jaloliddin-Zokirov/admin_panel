import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editLang } from "../../../Store/Lang/Lang";

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
    <div className={`cursor-pointer`} onClick={handleThemeToggle}>
      <p
        className={
          themeList
            ? "text-[#ccc5b9] border py-[3px] px-4 rounded-lg"
            : "text-[#adb5bd] border py-[3px] px-4 rounded-lg"
        }
      >
        {lang === "ru" ? "UZ" : "RU"}
      </p>
    </div>
  );
};

export default LangToggle;
