import React, { useState } from "react";
import styles from "./Hero.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { axios } from "../../server/api";
import { message } from "antd";
import { editError } from "../../Store/Error/Error";
import { useNavigate } from "react-router-dom";
import { successUploadHero } from "../../Store/Hero/Hero";

const PostHero = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  const { successUpload } = useSelector((state) => state.hero);
  const [value, setValue] = useState("0");
  const [value2, setValue2] = useState("0");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    const RuTitle = {
      title: document.getElementById("titleRU").value,
      description: document.getElementById("descRU").value,
    };
    const UzTitle = {
      title: document.getElementById("titleUZ").value,
      description: document.getElementById("descUZ").value,
    };
    const Image = {
      image: document.getElementById("image").files[0],
    };

    const formData = new FormData();
    formData.append("ru", JSON.stringify(RuTitle));
    formData.append("uz", JSON.stringify(UzTitle));
    formData.append("image", Image.image);

    try {
      const response = await axios.post("/api/hero", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(
        lang === "ru" ? "Загружено успешно" : "Muvaffaqiyatli yuklandi"
      );
      dispatch(successUploadHero(!successUpload));
    } catch (error) {
      dispatch(editError(error));
      navigate("/error");
    }
  }

  return (
    <form
      className={`${styles.hero__form} ${
        themeList ? styles.light : styles.dark
      }`}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit();
      }}
    >
      <h2 className={styles.hero__title}>
        {lang === "ru" ? "Разместите интерфейс" : "Interfeysni joylash"}
      </h2>
      <div className={styles.hero__postBox}>
        <div className={styles.hero__content}>
          <div className={styles.hero__ru}>
            <h3 className={styles.hero__subtitle}>RU</h3>
            <input
              className={styles.hero__titleInp}
              type="text"
              id="titleRU"
              required
              placeholder={
                lang === "ru"
                  ? "Введите заголовок...."
                  : "Sarlavxa kiriting...."
              }
            />
            <div className={styles.hero__descBox}>
              <textarea
                className={styles.hero__descriptionInp}
                type="text"
                id="descRU"
                required
                maxLength="38"
                placeholder={lang === "ru" ? "Описание" : "Tavsifi"}
                onChange={(evt) => setValue2(evt.target.value.length)}
              ></textarea>
              <span className={styles.description__length}>{value2}/38</span>
            </div>
          </div>
          <div className={styles.hero__uz}>
            <h3 className={styles.hero__subtitle}>UZ</h3>
            <input
              className={styles.hero__titleInp}
              type="text"
              id="titleUZ"
              required
              placeholder={
                lang === "ru"
                  ? "Введите заголовок...."
                  : "Sarlavxa kiriting...."
              }
            />
            <div className={styles.hero__descBox}>
              <textarea
                className={styles.hero__descriptionInp}
                type="text"
                id="descUZ"
                required
                maxLength="38"
                placeholder={lang === "ru" ? "Описание" : "Tavsifi"}
                onChange={(evt) => setValue(evt.target.value.length)}
              ></textarea>
              <span className={styles.description__length}>{value}/38</span>
            </div>
          </div>
        </div>
        <label className={styles.hero__label}>
          {lang === "ru" ? "Загрузить изображение:" : "Rasm yuklash:"}
          <input
            className={styles.hero__imgInp}
            type="file"
            id="image"
            required
          />
        </label>
      </div>
      <button className={styles.hero__postSubmit} type="submit">
        {lang === "ru" ? "Загрузить" : "Yuklash"}
        <UploadOutlined size={24} />
      </button>
    </form>
  );
};

export default PostHero;
