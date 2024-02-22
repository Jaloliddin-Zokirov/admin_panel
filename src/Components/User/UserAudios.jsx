import React, { useCallback, useEffect, useState } from "react";
import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Modal, message } from "antd";
import { axios } from "../../server/api";
import { editUserCard } from "../../Store/UserCard/UserCard";
import UserCardWrite from "../../Store/UserCard/UserCardWrite";
import { Link } from "react-router-dom";

const UserAudios = ({
  el,
  isPlaying,
  onPlay,
  onPause,
  yourAudioArray,
  currentPlaying,
}) => {
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { userCard } = useSelector((state) => state.userCard);

  const dispatch = useDispatch();

  const [waveform, setWaveform] = useState(null);
  const [duration, setDuration] = useState("0:00");
  const [process, setProcess] = useState("0:00");
  const [waveColor, setWaveColor] = useState("#494949");
  const [progressColor, setProgressColor] = useState("#B8B8B8");
  const [temporaryId, setTemporaryId] = useState();
  const [currentAudioId, setCurrentAudioId] = useState(null);
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
        .delete(`/api/audios/${userCard.id}/${id}`)
        .then((res) => {
          message.success(
            lang === "ru" ? "Удален успешно" : "Muvaffaqiyatli o'chirildi"
          );
          setId(null);
          UserCardWrite();
        })
        .catch((err) => {
          message.error(
            lang === "ru"
              ? "Произошла ошибка. Попробуйте позже"
              : "Xatolik yuz berdi. Keyinroq urinib ko'ring"
          );
        });
    }
  }, [id, setId, axios]);

  useEffect(() => {
    if (!themeList) {
      setWaveColor("#6c757d");
      setProgressColor("#adb5bd");
    } else {
      setWaveColor("#403d39");
      setProgressColor("#7e7871");
    }
  }, [themeList]);

  const initializeWaveform = () => {
    const newWaveform = WaveSurfer.create({
      container: `#waveform-${el.id}`,
      waveColor: waveColor,
      progressColor: progressColor,
      height: 60,
      barWidth: 1,
      barGap: 1,
      barRadius: 2,
    });

    newWaveform.load(el.audio);

    setWaveform(newWaveform);

    return () => {
      if (newWaveform) {
        newWaveform.destroy();
      }
    };
  };

  useEffect(() => {
    const cleanupWaveform = initializeWaveform();

    return () => {
      cleanupWaveform();
    };
  }, [el.id, el.audio, waveColor, progressColor]);

  useEffect(() => {
    if (currentPlaying !== null) {
      setTemporaryId(currentPlaying);
    }
  }, [currentPlaying]);

  const handlePlay = useCallback(
    (id) => {
      if (id === currentPlaying) {
        onPause();
        setCurrentAudioId(null);
      } else {
        onPlay(id);
      }
    },
    [onPlay, onPause, currentPlaying]
  );

  useEffect(() => {
    if (isPlaying && el.id === temporaryId) {
      waveform?.play();
    } else {
      waveform?.pause();
    }
  }, [isPlaying, temporaryId, el.id, waveform]);

  const handlePreviousAudio = useCallback(() => {
    const currentIndex = yourAudioArray.findIndex(
      (audio) => audio.id === el.id
    );
    if (currentIndex > 0) {
      const previousAudio = yourAudioArray[currentIndex - 1];
      setProcess("0:00");
      waveform.seekTo(0);
      onPlay(previousAudio.id);
    }
  }, [yourAudioArray, el.id, onPlay, waveform]);

  const handleNextAudio = useCallback(() => {
    const currentIndex = yourAudioArray.findIndex(
      (audio) => audio.id === el.id
    );
    if (currentIndex < yourAudioArray.length - 1) {
      const nextAudio = yourAudioArray[currentIndex + 1];
      setProcess("0:00");
      waveform.seekTo(0);
      onPlay(nextAudio.id);
    }
  }, [yourAudioArray, el.id, onPlay, waveform]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "Space":
          event.preventDefault();
          if (isPlaying && el.id === currentPlaying) {
            onPause();
          }
          if (currentPlaying === null && el.id === temporaryId) {
            onPlay(temporaryId);
          }
          break;
        case "ArrowLeft":
          if (isPlaying && el.id === currentPlaying) {
            waveform.skip(-5);
          }
          break;
        case "ArrowRight":
          if (isPlaying && el.id === currentPlaying) {
            waveform.skip(5);
          }
          break;
        case "ArrowUp":
          if (isPlaying && el.id === currentPlaying) {
            handlePreviousAudio();
          }
          break;
        case "ArrowDown":
          if (isPlaying && el.id === currentPlaying) {
            handleNextAudio();
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
  }, [handlePlay, waveform, el.id]);

  useEffect(() => {
    setCurrentAudioId(el.id);
  }, [el.id]);

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
        if (isPlaying && currentAudioId === el.id) {
          setProcess("0:00");
          waveform.seekTo(0);
          onPause();
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
  }, [waveform, isPlaying, currentAudioId, el.id]);

  return (
    <li
      className={`${styles.audio__item} ${
        themeList ? styles.audio__itemLight : styles.audio__itemDark
      }`}
      key={el.id}
    >
      <div className={styles.audio__top}>
        <div className={styles.audio__text}>
          <span>{el.title}</span>
          <span>{el.description}</span>
        </div>
        <div className={styles.audio__timeline}>
          <span>
            {process} / {duration}
          </span>
          <Link to={`/user/edit-audio/${el.id}`}>
            <EditIcon fontSize="small" />
          </Link>
          <button onClick={showModal}>
            <DeleteForeverIcon fontSize="small" />
          </button>
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
                setId(el.id);
                handleCancel();
              }}
            >
              {lang === "ru" ? "Удалить" : "O'chirish"}
            </button>
          </Modal>
        </div>
      </div>
      <div className={styles.audio__bottom}>
        <div
          className={styles.audio__playPause}
          onClick={() => handlePlay(el.id)}
        >
          {isPlaying ? (
            <svg
              fill="currentColor"
              height="40px"
              width="40px"
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
              width="40"
              height="40"
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
        <div className={styles.audio__waveform} id={`waveform-${el.id}`}></div>
      </div>
    </li>
  );
};

export default UserAudios;
