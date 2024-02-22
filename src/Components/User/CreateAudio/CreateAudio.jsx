import React, { useState } from "react";
import styles from "./CreateAudio.module.scss";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../server/api";

const CreateAudio = () => {
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { userCard } = useSelector((state) => state.userCard);
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const RuContent = {
      title: document.getElementById("titleRu").value,
      description: document.getElementById("descRu").value,
    };
    const UzContent = {
      title: document.getElementById("titleUz").value,
      description: document.getElementById("descUz").value,
    };
    const audio = document.getElementById("audio").files[0];

    try {
      const formData = new FormData();
      formData.append("ru", JSON.stringify(RuContent));
      formData.append("uz", JSON.stringify(UzContent));
      formData.append("audio", audio);

      const response = await axios.post(
        `/api/audios/${userCard.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success(
        lang === "ru" ? "Загружено успешно" : "Muvaffaqiyatli yuklandi"
      );
      navigate(`/user/${userCard.id}`);
    } catch (error) {
      message.error(lang === "ru" ? "Не удалось загрузить" : "Yuklab bo'lmadi");
    }
  };
  return (
    <form
      className={`${styles.form} ${themeList ? styles.light : styles.dark}`}
      onSubmit={(evt) => handleSubmit(evt)}
    >
      <h2 className={styles.title}>
        {lang === "ru" ? "Добавить новый звук" : "Yangi audio qo'shish"}
      </h2>
      <div className={styles.inp__bigBox}>
        <div className={styles.inp__box}>
          <input
            type="text"
            id="titleRu"
            placeholder={
              lang === "ru"
                ? "Введите Заголовок по-русски:"
                : "Rus tilida sarlavha kiriting:"
            }
          />
          <div className={styles.textareaBox}>
            <textarea
              type="text"
              maxLength={60}
              id="descRu"
              onChange={(evt) => setValue(evt.target.value.length)}
              placeholder={
                lang === "ru"
                  ? "Введите описание на русском языке:"
                  : "Rus tilida tavsif kiriting:"
              }
            />
            <span>{value}/60</span>
          </div>
        </div>
        <div className={styles.inp__box}>
          <input
            type="text"
            id="titleUz"
            placeholder={
              lang === "ru"
                ? "Введите Заголовок по-узбекски:"
                : "O'zbek tilida sarlavha kiriting:"
            }
          />
          <div className={styles.textareaBox}>
            <textarea
              type="text"
              maxLength={60}
              id="descUz"
              onChange={(evt) => setValue2(evt.target.value.length)}
              placeholder={
                lang === "ru"
                  ? "Введите описание на узбекском языке:"
                  : "O'zbek tilida tavsif kiriting:"
              }
            />
            <span>{value2}/60</span>
          </div>
        </div>
      </div>
      <label className={styles.label}>
        {lang === "ru" ? "Размещение аудио:" : "Audio joylash:"}
        <input className={styles.imgInp} type="file" id="audio" required />
      </label>
      <button className={styles.btn} type="submit">
        {lang === "ru" ? "Добавлять" : "Qo'shish"}
      </button>
    </form>
  );
};

export default CreateAudio;
