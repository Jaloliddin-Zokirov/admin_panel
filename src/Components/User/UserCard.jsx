import React from "react";
import styles from "./User.module.scss";
import { useSelector } from "react-redux";
import UserCardWrite from "../../Store/UserCard/UserCardWrite";
import Loading from "../Loading/Loading";

const UserCard = () => {
  UserCardWrite();
  const { userCard } = useSelector((state) => state.userCard);
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);

  return (
    <>
      {userCard[lang] !== undefined ? (
        <div className={styles.card}>
          <div className={styles.card__top}>
            <div className={styles.name__box}>
              <p className={styles.name}>{userCard[lang]?.firstname}</p>
              <p className={styles.name}>{userCard[lang]?.lastname}</p>
            </div>
            <p className={styles.desc}>{userCard[lang]?.description}</p>
            <audio className={styles.card__voice} controls>
              <source src={userCard[lang]?.smallaudio} type="audio/mpeg" />
            </audio>
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
          <ul className={styles.card__bottom}></ul>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserCard;
