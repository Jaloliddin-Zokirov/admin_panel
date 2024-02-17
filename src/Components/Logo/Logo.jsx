import React, { useEffect, useState } from "react";
import styles from "./Logo.module.scss";
import { axios, Forimage } from "../../server/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editError } from "../../Store/Error/Error";
import { editLogo, putLogo } from "../../Store/Logo/Logo";
import PostLogo from "./PostLogo";
import PutLogo from "./PutLogo";

const Logo = () => {
  const { lang } = useSelector((state) => state.lang);
  const { themeList } = useSelector((state) => state.theme);
  const { putLogoList } = useSelector((state) => state.logo);
  const { successUpload } = useSelector((state) => state.logo);
  const dispatch = useDispatch();
  const [logo, setLogo] = useState();
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/logo")
      .then((res) => {
        setLogo(res.data[0]);
        dispatch(editLogo(res.data[0]));
      })
      .catch((err) => {
        navigate("/error");
        dispatch(editError(err));
      });
  }, [axios, navigate, dispatch, successUpload]);

  useEffect(() => {
    if (id !== null) {
      axios
        .delete(`/api/logo/${id}`)
        .then((res) => {
          message.success(
            lang === "ru" ? "Удален успешно" : "Muvaffaqiyatli o'chirildi"
          );
          setId(null);
          setLogo(undefined);
          dispatch(editLogo([]));
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
    <div className={`${styles.logo} ${themeList ? styles.light : styles.dark}`}>
      <div>
        {logo !== undefined ? (
          !putLogoList ? (
            <div className={styles.logo__box}>
              <h2 className={styles.logo__title}>
                {lang === "ru" ? "Страница логотипа" : "Logotip sahifasi"}
              </h2>
              <div className={styles.logo__cardBox}>
                <div className={styles.logo__card}>
                  <img
                    className={styles.logo__cardImg}
                    src={`${Forimage}${logo.dark}`}
                    width={160}
                    height={160}
                    alt="site logo dark"
                  />
                  <p className={styles.logo__subtitle}>{logo.title}</p>
                </div>
                <div className={styles.logo__card}>
                  <img
                    className={styles.logo__cardImg}
                    src={`${Forimage}${logo.light}`}
                    width={160}
                    height={160}
                    alt="site logo ligh"
                  />
                  <p className={styles.logo__subtitle}>{logo.title}</p>
                </div>
              </div>

              <div className={styles.logo__btnBox}>
                <button
                  type="button"
                  className={styles.logo__btn}
                  onClick={() => dispatch(putLogo(true))}
                >
                  {lang === "ru" ? "Редактировать" : "Tahrirlash"}
                  <EditOutlined />
                </button>
                <button
                  type="button"
                  className={styles.logo__btnRed}
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
                  className={styles.logo__modal}
                >
                  <p className={styles.logo__modalText}>
                    {lang === "ru"
                      ? "Вы хотите удалить данные ?"
                      : "Ma'lumotni o'chirmoqchimisiz ?"}
                  </p>
                  <button
                    type="button"
                    className={styles.logo__modalBtn}
                    onClick={() => {
                      setId(logo._id);
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
            <PutLogo />
          )
        ) : (
          <PostLogo />
        )}
      </div>
    </div>
  );
};

export default Logo;
