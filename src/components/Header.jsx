import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import style from "./css/Header.module.css";
import logo from "./img/header_logo.svg";
import search_user from "./img/search_user.svg";
import add_post from "./img/add_circle.svg";
import notification from "./img/notifications.svg";
import noti_click from "./img/noti_click.svg";

import SearchUser from "./modal/SearchUser";
import useDetectClose from "../hooks/useDetectColse";
import Notification from "./dropdown/Notification";
import FeedModal from "./modal/FeedModal";

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

  // 모달창
  const [feedModalOpen, setFeedModalOpen] = useState(false);
  const openFeedModal = () => {
    setFeedModalOpen(true);
  };
  const closeFeedModal = () => {
    setFeedModalOpen(false);
  };

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const searchRef = useRef(null);
  const openSearchModal = () => {
    setSearchModalOpen(true);
  };
  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleClickOutsideSearch = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      closeSearchModal(); // 모달 닫기
    }
  };

  useEffect(() => {
    if (searchModalOpen) {
      // 모달이 열렸을 때만 이벤트 리스너 등록
      document.addEventListener("click", handleClickOutsideSearch);
    } else {
      // 모달이 닫히면 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutsideSearch);
    }

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutsideSearch);
    };
  }, [searchModalOpen]); // searchModalOpen이 변경될 때마다 실행

  // 알림창
  const notiRef = useRef(null);
  const [notiOpen, setNotiOpen] = useState(false);
  // const [notiOpen, setNotiOpen] = useDetectClose(notiRef, true);

  const handleClickNoti = () => {
    setNotiOpen(!notiOpen); // 토글 방식으로 변경
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.logoContainer} onClick={handleClickLogo}>
          <img src={logo} alt="logo" className={style.logoImg} />
        </div>

        <div className={style.menu}>
          <div className={style.iconContainer} onClick={openSearchModal}>
            <img
              src={search_user}
              alt="search user"
              className={style.menuIcon}
            />
            <div className={style.overlay}></div>
          </div>
          <div className={style.iconContainer} onClick={openFeedModal}>
            <img src={add_post} alt="add post" className={style.menuIcon} />
            <div className={style.overlay}></div>
          </div>
          <div className={style.iconContainer} onClick={handleClickNoti}>
            <img
              src={`${notiOpen ? noti_click : notification}`}
              alt="notification"
              className={style.menuIcon}
            />
            <div className={style.overlay}></div>
          </div>
        </div>
      </header>
      {/* <Notification /> */}
      {/* {notiOpen && <Notification useRef={notiRef} />} */}
      {notiOpen && <Notification />}
      <FeedModal isOpen={feedModalOpen} closeModal={closeFeedModal} />
      <SearchUser
        ref={searchRef}
        isOpen={searchModalOpen}
        closeModal={closeSearchModal}
      />
    </>
  );
};

export default Header;
