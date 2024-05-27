import React, { useState } from "react";
import styles from "./Logo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { axios } from "../../server/api";
import { message } from "antd";
import { putLogo } from "../../Store/Logo/Logo";
import ReactLoading from "react-loading";

const PutLogo = () => {
  const { lang } = useSelector((state) => state.lang);
  const { logoList } = useSelector((state) => state.logo);
  const { putLogoList } = useSelector((state) => state.logo);
  const { themeList } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [loadingCheck, setLoadingCheck] = useState(false);

  async function handleSubmit() {
    const logoTitle = {
      title: document.getElementById("title").value,
    };
    const logoDark = {
      dark: document.getElementById("dark").files[0],
    };
    const logoLight = {
      light: document.getElementById("light").files[0],
    };

    const formData = new FormData();
    formData.append("title", logoTitle.title);
    formData.append("dark", logoDark.dark);
    formData.append("light", logoLight.light);

    try {
      setLoadingCheck(true);
      const response = await axios.put(`/api/logo/${logoList._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(
        lang === "ru" ? "Загружено успешно" : "Muvaffaqiyatli yuklandi"
      );
      setLoadingCheck(false);
      dispatch(putLogo(!putLogoList));
    } catch (error) {
      message.error(
        lang === "ru"
          ? "Произошла ошибка. Попробуйте позже"
          : "Xatolik yuz berdi. Keyinroq urinib ko'ring"
      );
    }
  }

  return (
    <>
      {loadingCheck ? (
        <div className={styles.loading__BigBox}>
          <div className={styles.loading__box}>
            <ReactLoading
              type={"bars"}
              color={themeList ? "#5E503F" : "#6c757d"}
              height={100}
              width={100}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <form
        className={styles.logo__form}
        onSubmit={(evt) => {
          handleSubmit();
          evt.preventDefault();
        }}
      >
        <h2 className={styles.logo__title}>
          {lang === "ru" ? "Редактировать логотип" : "Logotipni taxrirlash"}
        </h2>
        <label className={styles.logo__label}>
          {lang === "ru" ? "Заголовок" : "Sarlavha"}
          <input
            className={styles.logo__inpTitle}
            type="text"
            name="title"
            placeholder="Write title"
            id="title"
            required
          />
        </label>
        <label className={styles.logo__label}>
          {lang === "ru"
            ? "Загрузите черное изображение"
            : "Qora rangli rasimni yuklang"}
          <input
            className={styles.logo__inpImg}
            type="file"
            name="dark"
            id="dark"
            required
          />
        </label>
        <label className={styles.logo__label}>
          {lang === "ru"
            ? "Загрузите белое изображение"
            : "Oq rangli rasimni yuklang"}
          <input
            className={styles.logo__inpImg}
            type="file"
            name="light"
            id="light"
            required
          />
        </label>
        <div className={styles.logo__btnBox}>
          <button
            className={styles.logo__putBtn}
            type="button"
            onClick={() => dispatch(putLogo(false))}
          >
            Cancle
          </button>
          <button className={styles.logo__putBtn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default PutLogo;
