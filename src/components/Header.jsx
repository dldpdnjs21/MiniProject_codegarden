import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import style from "./css/Header.module.css";
import logo from "./img/header_logo.svg";
import search_user from "./img/user_plus.svg";
import add_post from "./img/add_circle.svg";
import notification from "./img/notifications.svg";

import SearchUser from "./modal/SearchUser";

const Header = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/main");
  };

  const handleClickSearchUser = () => {
    console.log("사람검색");
  };

  const handleClickAdd = () => {
    console.log("피드 작성");
  };

  const handleClickNoti = () => {
    console.log("알림창");
  };

  //   모달창
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const modalBackground = useRef();
  return (
    <header className={style.header}>
      <div className={style.logoContainer} onClick={handleClickLogo}>
        <img src={logo} alt="logo" className={style.logoImg} />
      </div>

      <div className={style.menu}>
        <img
          src={search_user}
          alt="search user"
          className={style.menuIcon}
          onClick={handleClickSearchUser}
        />
        <img
          src={add_post}
          alt="add post"
          className={style.menuIcon}
          onClick={handleClickAdd}
        />
        <img
          src={notification}
          alt="notification"
          className={style.menuIcon}
          onClick={handleClickNoti}
        />
      </div>
      {searchModalOpen && (
        <SearchUser
          setModalOpen={setSearchModalOpen}
          modalBackground={modalBackground}
        />
      )}
    </header>
  );
};

export default Header;
