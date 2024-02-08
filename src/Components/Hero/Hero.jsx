import React, { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Forimage, axios } from "../../server/api";
import PostHero from "./PostHero";
import PutHero from "./PutHero";
import { editError } from "../../Store/Error/Error";
import { useNavigate } from "react-router-dom";
import { editHero, putHero } from "../../Store/Hero/Hero";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";

const Hero = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  const { successUpload } = useSelector((state) => state.hero);
  const { putHeroList } = useSelector((state) => state.hero);
  const [isHero, setHero] = useState();
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/hero")
      .then((res) => {
        setHero(res.data[0]);
        dispatch(editHero(res.data[0]));
      })
      .catch((err) => {
        navigate("/error");
        dispatch(editError(err));
      });
  }, [axios, navigate, dispatch, successUpload]);

  useEffect(() => {
    if (id !== null) {
      axios
        .delete(`/api/hero/${id}`)
        .then((res) => {
          message.success(
            lang === "ru" ? "Удален успешно" : "Muvaffaqiyatli o'chirildi"
          );
          setId(null);
          setHero(undefined);
          dispatch(editHero([]));
        })
        .catch((err) => {
          navigate("/error");
          dispatch(editError(err));
        });
    }
  }, [id, setId, axios, navigate, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.hero} ${themeList ? styles.light : styles.dark}`}>
      {isHero !== undefined ? (
        putHeroList ? (
          <div className={styles.hero__form}>
            <h2 className={styles.hero__title}>
              {lang === "ru" ? "Страница интерфейса" : "Interfeys sahifasi"}
            </h2>
            <div className={styles.hero__postBox}>
              <div className={styles.hero__content}>
                <div className={styles.hero__ru}>
                  <h3 className={styles.hero__subtitle}>RU</h3>
                  <p className={styles.hero__subtitleGet}>
                    <strong>
                      {lang === "ru" ? "Заголовок: " : "Sarlavha: "}
                    </strong>
                    {isHero?.ru.title}
                  </p>
                  <p className={styles.hero__descriptionGet}>
                    <strong>{lang === "ru" ? "Описание: " : "Tavsif: "}</strong>
                    {isHero?.ru.description}
                  </p>
                </div>
                <div className={styles.hero__uz}>
                  <h3 className={styles.hero__subtitle}>UZ</h3>
                  <p className={styles.hero__subtitleGet}>
                    <strong>
                      {lang === "ru" ? "Заголовок: " : "Sarlavha: "}
                    </strong>
                    {isHero?.uz.title}
                  </p>
                  <p className={styles.hero__descriptionGet}>
                    <strong>{lang === "ru" ? "Описание: " : "Tavsif: "}</strong>
                    {isHero?.uz.description}
                  </p>
                </div>
              </div>
              <img
                className={styles.hero__image}
                src={`${Forimage}${isHero?.ru.image}`}
                alt="hero image"
              />
            </div>
            <div className={styles.hero__btnBox}>
              <button
                type="button"
                className={styles.hero__btn}
                onClick={() => dispatch(putHero(false))}
              >
                {lang === "ru" ? "Редактировать" : "Tahrirlash"}
                <EditOutlined />
              </button>
              <button
                className={styles.hero__btnDel}
                type="button"
                onClick={showModal}
              >
                {lang === "ru" ? "Удалить" : "O'chirish"}
                <DeleteOutlined />
              </button>
              <Modal
                title={lang === "ru" ? "Удалить" : "O'chirish"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                className={styles.hero__modal}
              >
                <p className={styles.hero__modalText}>
                  {lang === "ru"
                    ? "Вы хотите удалить данные ?"
                    : "Ma'lumotni o'chirmoqchimisiz ?"}
                </p>
                <button
                  type="button"
                  className={styles.hero__modalBtn}
                  onClick={() => {
                    setId(isHero._id);
                    handleCancel();
                  }}
                >
                  {lang === "ru" ? "Удалить" : "O'chirish"}
                  <DeleteOutlined />
                </button>
              </Modal>
            </div>
          </div>
        ) : (
          <PutHero />
        )
      ) : (
        <PostHero />
      )}
    </div>
  );
};

export default Hero;
