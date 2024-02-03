import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axios } from "../../server/api";
import { editError } from "../Error/Error";
import { editUserCard } from "./UserCard";

const UserCardWrite = () => {
  const { id } = useParams();
  const [userCard, setUserCard] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`/api/audios/${id}`)
        .then((res) => setUserCard(res.data))
        .catch((err) => {
          dispatch(editError(err));
          navigate("/error");
        });
    }
  }, [id]);

  useEffect(() => {
    if (userCard) {
      dispatch(editUserCard(userCard));
    }
  }, [userCard]);

  return;
};

export default UserCardWrite;
