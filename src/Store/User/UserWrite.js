import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axios } from "../../server/api";
import { editError } from "../Error/Error";
import { editUser } from "./User";

const UserWrite = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/audios")
      .then((res) => setUser(res.data))
      .catch((err) => {
        dispatch(editError(err));
        navigate("/error");
      });
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(editUser(user));
    }
  }, [user]);
  return;
};

export default UserWrite;
