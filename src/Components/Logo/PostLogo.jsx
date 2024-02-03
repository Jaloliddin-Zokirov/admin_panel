import React from "react";
import styles from "./Logo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { axios } from "../../server/api";
import { message } from "antd";
import { editError } from "../../Store/Error/Error";
import { useNavigate } from "react-router-dom";
import { successUploadLogo } from "../../Store/Logo/Logo";

const PostLogo = () => {
  const { lang } = useSelector((state) => state.lang);
  const { successUpload } = useSelector((state) => state.logo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await axios.post("/api/logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(
        lang === "ru" ? "Загружено успешно" : "Muvaffaqiyatli yuklandi"
      );
      dispatch(successUploadLogo(!successUpload));
    } catch (error) {
      dispatch(editError(error));
      navigate("/error");
    }
  }

  return (
    <form
      className={styles.logo__form}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className={styles.logo__title}>
        {lang === "ru" ? "Размещение логотипа" : "Logotip joylash"}
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
        <button className={styles.logo__putBtn} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostLogo;
