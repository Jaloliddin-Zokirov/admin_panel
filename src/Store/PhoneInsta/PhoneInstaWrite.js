import { useEffect, useState } from "react";
import { axios } from "../../server/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editError } from "../Error/Error";
import { editPhoneInsta } from "../PhoneInsta/PhoneInsta";

const PhoneInstaWrite = () => {
  const [phoneInsta, setPhoneInsta] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/phone-number")
      .then((res) => setPhoneInsta(res.data))
      .catch((err) => {
        dispatch(editError(err));
        navigate("/error");
      });
  }, []);

  useEffect(() => {
    if (phoneInsta) {
      dispatch(editPhoneInsta(phoneInsta));
    }
  }, [phoneInsta]);

  return;
};

export default PhoneInstaWrite;
