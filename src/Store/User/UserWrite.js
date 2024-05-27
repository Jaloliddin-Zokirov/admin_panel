import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axios } from "../../server/api";
import { editError } from "../Error/Error";
import { editUser } from "./User";

const UserWrite = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/audios")
      .then((res) => setUser(res.data))
      .catch((err) => {
        dispatch(editError(err));
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
