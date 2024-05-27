import React, { useState } from "react";
import styles from "./PhoneInsta.module.scss";
import { axios } from "../../server/api";
import { Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { successUploadPhoneInsta } from "../../Store/PhoneInsta/PhoneInsta";
import ReactLoading from "react-loading";

const PostPhoneInsta = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  const { successUpload } = useSelector((state) => state.phoneInsta);
  const dispatch = useDispatch();
  const [loadingCheck, setLoadingCheck] = useState(false);

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
      setLoadingCheck(true);
      const response = await axios.post(`/api/phone-number`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      message.success(
        lang === "ru" ? "Загружено успешно" : "Muvaffaqiyatli yuklandi"
      );
      setLoadingCheck(false);
      dispatch(successUploadPhoneInsta(!successUpload));
    } catch (error) {
      message.error(
        lang === "ru"
          ? "Произошла ошибка. Попробуйте позже"
          : "Xatolik yuz berdi. Keyinroq urinib ko'ring"
      );
    }
  }

  return (
    <div
      className={`${styles.phoneInsta} ${
        themeList ? styles.light : styles.dark
      }`}
    >
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
              <span>@</span>
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
