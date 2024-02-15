import React, { useState } from "react";
import styles from "./User.module.scss";
import { useSelector } from "react-redux";
import Loading from "react-loading";
import UserWrite from "../../Store/User/UserWrite";
import { Link } from "react-router-dom";

const Users = () => {
  UserWrite();
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { userList } = useSelector((state) => state.user);

  const [indexx, setIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pageNation, setPageNation] = useState(1);

  const handlePlay = (index) => {
    const audioElements = document.querySelectorAll("audio");

    audioElements.forEach((audio, i) => {
      if (i === index) {
        if (audio.paused) {
          audio.play();
          setIndex(index);
          setIsPlaying(true);

          audio.addEventListener("ended", () => {
            setIndex(null);
            setIsPlaying(false);
          });
        } else {
          audio.pause();
          setIndex(null);
          setIsPlaying(false);
        }
      } else {
        audio.pause();
      }
    });
  };

  const getVisibleCategory = () => {
    const startIndex = (pageNation - 1) * 9;
    const endIndex = startIndex + 9;
    return userList.slice(startIndex, endIndex);
  };

  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={`${styles.user} ${themeList ? styles.light : styles.dark}`}>
      <h2 className={styles.title}>
        {lang === "ru"
          ? "Страница Актеры и актрисы"
          : "Aktyor va aktrisalar sahifasi"}
      </h2>
      <ul className={styles.list__card}>
        <Link to={"add-user"} className={styles.add__item} onClick={goToTop}>
          +
        </Link>
        {userList !== undefined ? (
          getVisibleCategory().map((el, index) => {
            return (
              <li className={styles.item} key={el._id}>
                <audio className={styles.users__voice} controls>
                  <source src={el[lang].smallaudio} type="audio/mpeg" />
                </audio>
                <Link className={styles.item__link} to={el._id}>
                  <img
                    className={styles.img}
                    src={el[lang].smallimage}
                    width={200}
                    height={240}
                    alt=""
                  />
                </Link>
                <div className={styles.content}>
                  <div className={styles.textBox}>
                    <span className={styles.firstname}>
                      {el[lang].firstname}
                    </span>
                    <span className={styles.lastname}>{el[lang].lastname}</span>
                  </div>
                  <div
                    className={styles.play}
                    onClick={() => handlePlay(index)}
                  >
                    {isPlaying && indexx === index ? (
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
                </div>
              </li>
            );
          })
        ) : (
          <Loading />
        )}
      </ul>
    </div>
  );
};

export default Users;
