import React from "react";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import LangToggle from "./LangToggle/LangToggle";
import { useSelector } from "react-redux";
import LogoWrite from "../../Store/Logo/LogoWrite";
import { Link } from "react-router-dom";
import { Forimage } from "../../server/api";

const Header = () => {
  LogoWrite();
  const { themeList } = useSelector((state) => state.theme);
  const { logoList } = useSelector((state) => state.logo);

  return (
    <header
      className={`py-2 transition-all duration-200 ease-in-out ${
        themeList ? "bg-[#403d39]" : "bg-[#212529]"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/">
            {logoList !== undefined ? (
              <img
                width={45}
                height={45}
                src={`${Forimage}${logoList.light}`}
                alt={logoList.title}
              />
            ) : (
              <></>
            )}
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LangToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
