import React, { useCallback, useEffect, useState } from "react";
import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import UserCardWrite from "../../Store/UserCard/UserCardWrite";
import Loading from "../Loading/Loading";
import WaveSurfer from "wavesurfer.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Modal, message } from "antd";
import { axios } from "../../server/api";
import { Link, useNavigate } from "react-router-dom";
import { editUserCard } from "../../Store/UserCard/UserCard";
import UserAudios from "./UserAudios";

const UserCard = React.memo(() => {
  UserCardWrite();
  const { userCard } = useSelector((state) => state.userCard);
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [waveform, setWaveform] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [process, setProcess] = useState("0:00");
  const [waveColor, setWaveColor] = useState("#494949");
  const [progressColor, setProgressColor] = useState("#B8B8B8");
  const [id, setId] = useState(null);
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

  useEffect(() => {
    if (id !== null) {
      axios
        .delete(`/api/audios/${id}`)
        .then((res) => {
          message.success(
            lang === "ru" ? "Удален успешно" : "Muvaffaqiyatli o'chirildi"
          );
          setId(null);
          dispatch(editUserCard([]));
          navigate("/user");
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

  useEffect(() => {
    if (!themeList) {
      setWaveColor("#ced4da");
      setProgressColor("#adb5bd");
    } else {
      setWaveColor("#000");
      setProgressColor("#7e7871");
    }
  }, [themeList]);

  const initializeWaveform = useCallback(() => {
    const newWaveform = WaveSurfer.create({
      container: `#waveform-${userCard[lang]?._id}`,
      waveColor: waveColor,
      progressColor: progressColor,
      height: 60,
      barWidth: 1,
      barGap: 1,
      barRadius: 2,
    });

    newWaveform.load(userCard[lang]?.smallaudio);

    setWaveform(newWaveform);
  }, [userCard, lang, waveColor, progressColor]);

  useEffect(() => {
    if (userCard[lang]?._id) {
      if (waveform) {
        waveform.destroy();
      }
      initializeWaveform();
    }
    return () => {
      if (waveform) {
        waveform.destroy();
      }
    };
  }, [userCard, lang, initializeWaveform]);

  const handlePlay1 = useCallback(() => {
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        waveform?.play();
      } else {
        waveform?.pause();
      }
      return !prevIsPlaying;
    });
  }, [waveform]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "Space":
          event.preventDefault();
          handlePlay1();
          break;
        case "ArrowLeft":
          if (isPlaying) {
            waveform.skip(-5);
          }
          break;
        case "ArrowRight":
          if (isPlaying) {
            waveform.skip(5);
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlay1, isPlaying, waveform, userCard[lang]]);

  const timeCalculator = (value) => {
    let minutes = Math.floor(value / 60);
    let seconds = Math.floor(value % 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  };

  useEffect(() => {
    if (waveform) {
      waveform.on("ready", function () {
        setDuration(timeCalculator(waveform.getDuration()));
      });
      waveform.on("audioprocess", function () {
        setProcess(timeCalculator(waveform.getCurrentTime()));
      });
      waveform.on("finish", function () {
        if (isPlaying && userCard[lang]?.id) {
          setProcess("0:00");
          waveform.seekTo(0);
          waveform?.pause();
          setIsPlaying(false);
        }
      });
    }

    return () => {
      if (waveform) {
        waveform.un("ready");
        waveform.un("audioprocess");
        waveform.un("finish");
      }
    };
  }, [waveform, isPlaying, userCard[lang]]);

  const [currentPlaying, setCurrentPlaying] = useState(null);
  const handlePlay = useCallback(
    (id) => {
      setCurrentPlaying((prevId) => (prevId === id ? null : id));
    },
    [currentPlaying]
  );

  const handlePause = useCallback(() => {
    setCurrentPlaying(null);
  }, []);

  return (
    <>
      {userCard[lang] !== undefined ? (
        <div
          className={`${styles.card} ${
            themeList ? styles.card__light : styles.card__dark
          }`}
        >
          <div className={styles.card__top}>
            <div className={styles.name__box}>
              <p className={styles.name}>
                {userCard[lang]?.firstname} {userCard[lang]?.lastname}
              </p>
              <div className={styles.edit__delete}>
                <Link className={styles.edit__btn} to={"/user/edit-user"}>
                  EDIT
                  <EditIcon fontSize="small" />
                </Link>

                <span className={styles.delete__btn} onClick={showModal}>
                  DELETE
                  <DeleteForeverIcon fontSize="small" />
                </span>
                <Modal
                  title={lang === "ru" ? "Удалить" : "O'chirish"}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={false}
                  className={styles.modal}
                >
                  <p className={styles.modalText}>
                    {lang === "ru"
                      ? "Вы хотите удалить данные ?"
                      : "Ma'lumotni o'chirmoqchimisiz ?"}
                  </p>
                  <button
                    type="button"
                    className={styles.modalBtn}
                    onClick={() => {
                      setId(userCard.id);
                      handleCancel();
                    }}
                  >
                    {lang === "ru" ? "Удалить" : "O'chirish"}
                  </button>
                </Modal>
              </div>
            </div>
            <p className={styles.desc}>{userCard[lang]?.description}</p>
            <div className={styles.audio}>
              <div className={styles.play__pause} onClick={handlePlay1}>
                {isPlaying ? (
                  <svg
                    fill="currentColor"
                    height="60px"
                    width="60px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320
  c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320
  c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 56 56"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 28.0162C0 12.5615 12.5676 0 28 0C43.4324 0 56 12.5615 56 28.0162C56 43.4385 43.4324 56 28 56C12.5676 56 0 43.4385 0 28.0162ZM38.2703 30.85C38.5676 30.5528 38.946 30.0936 39.0271 29.9855C39.4595 29.4182 39.6757 28.7159 39.6757 28.0162C39.6757 27.2301 39.4325 26.5007 38.973 25.9064C38.9353 25.8688 38.8616 25.7885 38.7655 25.6839C38.5857 25.4882 38.3277 25.2074 38.0811 24.9609C35.8649 22.5837 30.0811 18.6937 27.0541 17.5051C26.5946 17.3187 25.4325 16.9108 24.8108 16.8837C24.2162 16.8837 23.6487 17.0188 23.1081 17.289C22.4325 17.6671 21.8919 18.2615 21.5946 18.9638C21.4054 19.4501 21.1081 20.9088 21.1081 20.9358C20.8108 22.5297 20.6487 25.123 20.6487 27.9865C20.6487 30.7176 20.8108 33.2002 21.0541 34.821C21.0608 34.8277 21.084 34.9436 21.1201 35.1237C21.2299 35.6712 21.4587 36.8118 21.7027 37.2793C22.2973 38.4139 23.4595 39.1163 24.7027 39.1163H24.8108C25.6217 39.0892 27.3244 38.3869 27.3244 38.3599C30.1892 37.1712 35.8379 33.4703 38.1081 31.0121L38.2703 30.85Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
              <div
                className={styles.wavesurfer}
                id={`waveform-${userCard[lang]?._id}`}
              />
              <p className={styles.sec_min}>
                {process}
                {" / "}
                {duration}
              </p>
            </div>
            <div className={styles.img__video}>
              <img
                className={styles.image}
                src={userCard[lang]?.image}
                alt="user image"
              />
              <video
                className={styles.video}
                id="video1"
                controls
                disablePictureInPicture
                controlsList="nofullscreen noplaybackrate nodownload"
              >
                <source src={userCard[lang]?.video} />
              </video>
            </div>
          </div>
          <div className={styles.card__bottom}>
            <h2 className={styles.card__title}>
              {lang === "ru" ? "Аудиозаписи" : "Audio yozuvlar"}
            </h2>
            <div className={styles.sorted}>
              <Link className={styles.newAudio} to={"/user/create-audio"}>
                {lang === "ru" ? "Добавить новый звук" : "Yangi audio qo'shish"}
              </Link>
            </div>
            <ul className={styles.card__audioList}>
              {userCard[lang].audios.map((el) => {
                return (
                  <UserAudios
                    key={el.id}
                    el={el}
                    isPlaying={el.id === currentPlaying}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    yourAudioArray={userCard[lang].audios}
                    currentPlaying={currentPlaying}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
});

export default UserCard;
