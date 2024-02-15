import React from "react";
import { Outlet } from "react-router-dom";

const MainUser = () => {
  return <div>{<Outlet />}</div>;
};

export default MainUser;
