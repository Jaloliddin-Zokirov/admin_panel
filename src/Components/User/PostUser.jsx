import React, { useState } from "react";
import styles from "./User.module.scss";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../server/api";
import { message } from "antd";

const PostUser = () => {
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const RuTitle = {
      firstname: document.getElementById("firstnameRu").value,
      lastname: document.getElementById("lastnameRu").value,
      instagram: document.getElementById("instagramRu").value,
      description: document.getElementById("descriptionRu").value,
    };
    const UzTitle = {
      firstname: document.getElementById("firstnameUz").value,
      lastname: document.getElementById("lastnameUz").value,
      instagram: document.getElementById("instagramUz").value,
      description: document.getElementById("descriptionUz").value,
    };
    const Image = {
      video: document.getElementById("video").files[0],
      smallaudio: document.getElementById("smallaudio").files[0],
      image: document.getElementById("image").files[0],
    };

    try {
      const formData = new FormData();
      formData.append("ru", JSON.stringify(RuTitle));
      formData.append("uz", JSON.stringify(UzTitle));
      formData.append("ru_video", Image.video);
      formData.append("ru_smallaudio", Image.smallaudio);
      formData.append("ru_image", Image.image);

      const response = await axios.post("/api/audios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(
        lang === "ru" ? "Загружено успешно" : "Muvaffaqiyatli yuklandi"
      );
      navigate("/user");
    } catch (error) {
      message.error(lang === "ru" ? "Не удалось загрузить" : "Yuklab bo'lmadi");
    }
  };

  return (
    <form
      className={`${styles.user__form} ${
        themeList ? styles.light : styles.dark
      }`}
      onSubmit={(evt) => handleSubmit(evt)}
    >
      <h2 className={`${styles.title} ${styles.post__title}`}>
        <Link to={"/user"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 561.131 561.131"
            fill="currentColor"
          >
            <path
              d="m6.684 373.604 205.993 24.55c5.033.601 6.909-2.38 4.189-6.658l-39.245-61.689c-2.72-4.278-1.457-9.948 2.876-12.583 2.549-1.548 5.19-3.146 7.867-4.804 4.327-2.843 9.137-5.113 14.03-7.764l7.509-3.983c1.276-.68 2.561-1.362 3.858-2.054 1.328-.603 2.668-1.209 4.015-1.817 5.429-2.467 11.007-4.997 16.708-7.586 5.792-2.39 11.827-4.557 17.953-6.946 6.099-2.546 12.525-4.256 18.997-6.368 3.253-1.028 6.527-2.059 9.816-3.1 3.342-.832 6.701-1.671 10.077-2.512 6.769-1.659 13.616-3.592 20.611-4.707l10.518-1.977c3.522-.691 7.06-1.358 10.615-1.723 7.108-.854 14.271-1.919 21.441-2.628l21.521-1.463c7.148-.211 14.263-.168 21.35-.269 3.553-.113 7.057.049 10.539.25l10.413.511c3.442.217 6.913.227 10.282.612l10.046 1.083c6.64.747 13.228 1.27 19.492 2.488l18.464 3.094 17.111 3.895c2.662.603 5.27 1.197 7.818 1.775 2.638.799 5.217 1.576 7.729 2.335l14.271 4.314c4.435 1.42 8.776 2.476 12.445 3.942l10.208 3.95c4.363 1.692 8.075 3.13 11.056 4.287 4.728 1.833 5.19.976 1.025-1.919l-9.868-6.863c-2.81-1.943-5.915-4.095-9.3-6.438-3.394-2.393-7.24-4.364-11.255-6.812l-12.854-7.552-6.962-4.091-7.953-3.99c-5.278-2.622-10.777-5.355-16.469-8.186l-18.146-7.763c-6.218-2.831-12.834-5.021-19.575-7.479l-10.26-3.681c-3.461-1.261-7.041-2.154-10.618-3.265-3.599-1.062-7.228-2.133-10.885-3.21-3.659-1.107-7.365-2.182-11.145-2.986-7.536-1.732-15.195-3.623-22.986-5.267-7.861-1.355-15.787-2.72-23.743-4.088-8.008-1.132-16.107-1.897-24.247-2.846-4.073-.539-8.148-.765-12.23-.958-4.095-.217-8.186-.438-12.271-.655-8.204-.618-16.353-.376-24.502-.358l-12.197.095c-4.036.257-8.054.514-12.044.771-7.99.594-15.998.845-23.724 2.004-7.757 1.007-15.468 1.86-22.968 3.014-7.47 1.401-14.78 2.775-21.895 4.109l-5.324 1.022-5.168 1.285-10.128 2.54c-6.634 1.729-13.176 3.158-19.195 5.227-12.188 3.917-23.284 7.102-33.636 11.484-.08.03-.156.061-.232.092-.128.052-2.439-3.375-5.159-7.653L73.31 165.844c-2.721-4.278-6.215-3.843-7.806.97L.447 363.799c-1.591 4.813 1.199 9.205 6.237 9.805z"
              fill="currentColor"
            />
          </svg>
        </Link>
        {lang === "ru"
          ? "Добавить актера или актрису"
          : "Aktyor yoki aktrisa qo'shish"}
      </h2>
      <div className={styles.content__form}>
        <div className={styles.form__top}>
          <div className={styles.left}>
            <h3 className={styles.lang__title}>
              {lang === "ru"
                ? "Размещать информацию на русском языке"
                : "Ma'lumotni rus tilida joylashtiring"}
            </h3>
            <div className={styles.inp__content}>
              <input
                className={styles.inp}
                required
                type="text"
                placeholder={
                  lang === "ru" ? "Введите имя..." : "Ism kiriting..."
                }
                id="firstnameRu"
              />
              <input
                className={styles.inp}
                required
                type="text"
                placeholder={
                  lang === "ru" ? "Введите фамилию..." : "Familiya kiriting..."
                }
                id="lastnameRu"
              />
              <input
                className={styles.inp}
                required
                type="text"
                placeholder={
                  lang === "ru"
                    ? "Введите свое имя пользователя Instagram..."
                    : "Instagram foydalanuvchi nomingizni kiriting..."
                }
                id="instagramRu"
              />
              <div className={styles.textareaBox}>
                <textarea
                  className={styles.textarea}
                  required
                  maxLength={150}
                  onChange={(evt) => setValue(evt.target.value.length)}
                  placeholder={
                    lang === "ru" ? "Введите описание..." : "Tavsif kiriting..."
                  }
                  id="descriptionRu"
                ></textarea>
                <span className={styles.textarea__limit}>{value}/150</span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h3 className={styles.lang__title}>
              {lang === "ru"
                ? "Разместить информацию на узбекском языке"
                : "Ma'lumotni o'zbek tilida joylashtiring"}
            </h3>
            <div className={styles.inp__content}>
              <input
                className={styles.inp}
                required
                type="text"
                placeholder={
                  lang === "ru" ? "Введите имя..." : "Ism kiriting..."
                }
                id="firstnameUz"
              />
              <input
                className={styles.inp}
                required
                type="text"
                placeholder={
                  lang === "ru" ? "Введите фамилию..." : "Familiya kiriting..."
                }
                id="lastnameUz"
              />
              <input
                className={styles.inp}
                required
                type="text"
                placeholder={
                  lang === "ru"
                    ? "Введите свое имя пользователя Instagram..."
                    : "Instagram foydalanuvchi nomingizni kiriting..."
                }
                id="instagramUz"
              />
              <div className={styles.textareaBox}>
                <textarea
                  className={styles.textarea}
                  required
                  maxLength={150}
                  onChange={(evt) => setValue2(evt.target.value.length)}
                  placeholder={
                    lang === "ru" ? "Введите описание..." : "Tavsif kiriting..."
                  }
                  id="descriptionUz"
                ></textarea>
                <span className={styles.textarea__limit}>{value2}/150</span>
              </div>
            </div>
          </div>
        </div>
        <label className={styles.label}>
          {lang === "ru" ? "Загрузите видео:" : "Video yuklash:"}
          <input className={styles.imgInp} type="file" id="video" required />
        </label>
        <label className={styles.label}>
          {lang === "ru"
            ? "Небольшая Загрузите аудио:"
            : "Kichik audio yuklash:"}
          <input
            className={styles.imgInp}
            type="file"
            id="smallaudio"
            required
          />
        </label>
        <label className={styles.label}>
          {lang === "ru" ? "Загрузить изображение:" : "Rasim yuklash:"}
          <input className={styles.imgInp} type="file" id="image" required />
        </label>
        <div className={styles.btn__box}>
          <button className={styles.btn} type="button">
            {lang === "ru" ? "Очистка" : "Tozalash"}
          </button>
          <button className={styles.btn} type="submit">
            {lang === "ru" ? "Загрузить" : "Yuklash"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostUser;
