import { useEffect, useState } from "react";
import { axios } from "../../server/api";
import { useDispatch } from "react-redux";
import { editLogo } from "./Logo";
import { useNavigate } from "react-router-dom";
import { editError } from "../Error/Error";

function LogoWrite() {
  const [logo, setLogo] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/logo")
      .then((res) => setLogo(res.data[0]))
      .catch((err) => {
        dispatch(editError(err));
        navigate("/error");
      });
  }, []);

  useEffect(() => {
    if (logo) {
      dispatch(editLogo(logo));
    }
  }, [logo]);

  return;
}

export default LogoWrite;
