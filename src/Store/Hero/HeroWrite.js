import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axios } from "../../server/api";
import { editError } from "../Error/Error";
import { editHero } from "./Hero";

const HeroWrite = () => {
  const [hero, setHero] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/hero")
      .then((res) => setHero(res.data))
      .catch((err) => {
        dispatch(editError(err));
        navigate("/error");
      });
  }, []);

  useEffect(() => {
    if (hero) {
      dispatch(editHero(hero));
    }
  }, [hero]);

  return;
};

export default HeroWrite;
