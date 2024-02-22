import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Error from "../Error/Error";
import Logo from "../Logo/Logo";
import Hero from "../Hero/Hero";
import User from "../User/MainUser";
import Users from "../User/Users";
import PostUser from "../User/PostUser";
import Support from "../Support/Support";
import Settings from "../Settings/Settings";
import PhoneInsta from "../PhoneInsta/PhoneInsta";
import UserCard from "../User/UserCard";
import CreateAudio from "../User/CreateAudio/CreateAudio";
import EditUser from "../User/Edit/EditUser";
import EditAudio from "../User/Edit/EditAudio";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="phone-insta" element={<PhoneInsta />} />
        <Route path="logo" element={<Logo />} />
        <Route path="hero" element={<Hero />} />
        <Route path="user" element={<User />}>
          <Route index element={<Users />} />
          <Route path=":id" element={<UserCard />} />
          <Route path="edit-user" element={<EditUser />} />
          <Route path="edit-audio/:id" element={<EditAudio />} />
          <Route path="add-user" element={<PostUser />} />
          <Route path="create-audio" element={<CreateAudio />} />
        </Route>
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
