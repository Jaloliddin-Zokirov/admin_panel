import React from "react";
import styles from "./PhoneInsta.module.scss";
import { axios } from "../../server/api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editError } from "../../Store/Error/Error";
import { successUploadPhoneInsta } from "../../Store/PhoneInsta/PhoneInsta";

const PostPhoneInsta = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  const { successUpload } = useSelector((state) => state.phoneInsta);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    const tel = {
      number: document.getElementById("tel").value,
    };
    const insta = {
      instagram: document.getElementById("insta").value,
    };

    const jsonData = {
      number: tel.number,
      instagram: `https://www.instagram.com/${insta.instagram}`,
    };

    try {
      const response = await axios.post(`/api/phone-number`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      message.success(
        lang === "ru" ? "Загружено успешно" : "Muvaffaqiyatli yuklandi"
      );

      dispatch(successUploadPhoneInsta(!successUpload));
    } catch (error) {
      dispatch(editError(error));
      navigate("/error");
    }
  }

  return (
    <div
      className={`${styles.phoneInsta} ${
        themeList ? styles.light : styles.dark
      }`}
    >
      <form
        className={styles.phoneInsta__box}
        onSubmit={(evt) => {
          handleSubmit();
          evt.preventDefault();
        }}
      >
        <h2 className={styles.phoneInsta__title}>
          {lang === "ru"
            ? "Размещение в Инстаграм && Tелефоне"
            : "Instagram && Telefonda joylash"}
        </h2>
        <div className={styles.phoneInsta__content}>
          <div className={styles.phoneInsta__link}>
            <strong>
              {lang === "ru" ? "Номер телефона: " : "Telefon raqami: "}
            </strong>
            <div className={styles.telInp__box}>
              <span>+998:</span>
              <input
                className={styles.phoneInsta__telInp}
                type="tel"
                id="tel"
                placeholder={
                  lang === "ru"
                    ? "Введите номер телефона"
                    : "Telefon raqam kiriting"
                }
              />
            </div>
          </div>
          <div className={styles.phoneInsta__link}>
            <strong>{lang === "ru" ? "Инстаграм: " : "Instagram: "}</strong>
            <div className={styles.telInp__box}>
              <span>https://www.instagram.com/</span>
              <input
                className={styles.phoneInsta__instaInp}
                type="text"
                id="insta"
                placeholder={
                  lang === "ru"
                    ? "Войти в аккаунт Инстаграм"
                    : "Instagram akaunt kiriting"
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.phoneInsta__btnBox}>
          <button className={styles.phoneInsta__btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPhoneInsta;
