import React, { useState } from "react";
import style from "../css/SearchUser.module.css";
import { FaPaperclip, FaImage, FaCode } from "react-icons/fa";
import searchicon from "../img/searchicon.svg";

const SearchUser = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>사용자 검색</div>
        <div>
          <input
            type="text"
            placeholder="유저를 검색해보세요"
            className={style.searchInput}
          />
          <img className={style.searchicon} src={searchicon} alt="검색" />
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
