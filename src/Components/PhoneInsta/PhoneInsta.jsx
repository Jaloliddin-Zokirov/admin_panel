import React, { useEffect, useState } from "react";
import styles from "./PhoneInsta.module.scss";
import { axios } from "../../server/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editError } from "../../Store/Error/Error";
import PostPhoneInsta from "./PostPhoneInsta";
import PutPhoneInsta from "./PutPhoneInsta";
import {
  editPhoneInsta,
  putPhoneInsta,
} from "../../Store/PhoneInsta/PhoneInsta";
import ReactLoading from "react-loading";

const PhoneInsta = React.memo(() => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  const { putPhoneInstaList } = useSelector((state) => state.phoneInsta);
  const { successUpload } = useSelector((state) => state.phoneInsta);
  const [phoneInsta, setPhoneInsta] = useState();
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/phone-number")
      .then((res) => {
        setPhoneInsta(res.data[0]);
        dispatch(editPhoneInsta(res.data[0]));
      })
      .catch((err) => {
        navigate("/error");
        dispatch(editError(err));
      });
  }, [axios, navigate, dispatch, successUpload, putPhoneInstaList]);

  useEffect(() => {
    if (id !== null) {
      axios
        .delete(`/api/phone-number/${id}`)
        .then((res) => {
          message.success(
            lang === "ru" ? "Удален успешно" : "Muvaffaqiyatli o'chirildi"
          );
          setId(null);
          setPhoneInsta(undefined);
          dispatch(editPhoneInsta([]));
        })
        .catch((err) => {
          message.error(
            lang === "ru"
              ? "Произошла ошибка. Попробуйте позже"
              : "Xatolik yuz berdi. Keyinroq urinib ko'ring"
          );
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
    <div
      className={`${styles.phoneInsta} ${
        themeList ? styles.light : styles.dark
      }`}
    >
      {phoneInsta !== undefined ? (
        putPhoneInstaList ? (
          <div className={styles.phoneInsta__box}>
            <h2 className={styles.phoneInsta__title}>
              {lang === "ru"
                ? "Телефон && Инстаграм страница"
                : "Phone && Instagram sahifasi"}
            </h2>
            <div className={styles.phoneInsta__content}>
              <p className={styles.phoneInsta__link}>
                <strong>
                  {lang === "ru" ? "Номер телефона: " : "Telefon raqami: "}
                </strong>
                <Link to={`tel:+998${phoneInsta.number}`}>
                  {phoneInsta.number}
                </Link>
              </p>
              <p className={styles.phoneInsta__link}>
                <strong>{lang === "ru" ? "Инстаграм: " : "Instagram: "}</strong>
                <Link to={phoneInsta.instagram} target="_blank">
                  {phoneInsta.instagram.replace(
                    "https://www.instagram.com/",
                    "@"
                  )}
                </Link>
              </p>
            </div>
            <div className={styles.phoneInsta__btnBox}>
              <button
                type="button"
                className={styles.phoneInsta__btn}
                onClick={() => dispatch(putPhoneInsta(false))}
              >
                {lang === "ru" ? "Редактировать" : "Tahrirlash"}
                <EditOutlined />
              </button>
              <button
                type="button"
                className={styles.phoneInsta__btnRed}
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
                className={styles.phoneInsta__modal}
              >
                <p className={styles.phoneInsta__modalText}>
                  {lang === "ru"
                    ? "Вы хотите удалить данные ?"
                    : "Ma'lumotni o'chirmoqchimisiz ?"}
                </p>
                <button
                  type="button"
                  className={styles.phoneInsta__modalBtn}
                  onClick={() => {
                    setId(phoneInsta._id);
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
          <PutPhoneInsta />
        )
      ) : (
        <PostPhoneInsta />
      )}
    </div>
  );
});

export default PhoneInsta;
