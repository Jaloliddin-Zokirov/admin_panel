import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Error from "../Error/Error";
import Logo from "../Logo/Logo";
import User from "../User/User";
import Support from "../Support/Support";
import Settings from "../Settings/Settings";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="logo" element={<Logo />} />
        <Route path="user" element={<User />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
