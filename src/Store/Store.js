import { configureStore } from "@reduxjs/toolkit";
import Logo from "./Logo/Logo";
import Error from "./Error/Error";
import Theme from "./Theme/Theme";
import Hero from "./Hero/Hero";
import PhoneInsta from "./PhoneInsta/PhoneInsta";
import Lang from "./Lang/Lang";
import User from "./User/User";
import UserCard from "./UserCard/UserCard";

const Store = configureStore({
  reducer: {
    theme: Theme,
    lang: Lang,
    logo: Logo,
    phoneInsta: PhoneInsta,
    hero: Hero,
    user: User,
    userCard: UserCard,
    error: Error,
  },
});

export default Store;
