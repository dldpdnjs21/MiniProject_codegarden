import React, { useState } from "react";
import style from "../css/SearchUser.module.css";
import searchicon from "../img/searchicon.svg";
import TechStackBadge from "../TechStackBadge";
import default_profile from "../img/default_profile.svg";

const SearchUser = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const users = [
    {
      profileImg: "",
      nickname: "먹짱킴",
      developmentField: "프론트엔드",
      techStacks: [
        { name: "React", color: "61DAFB" },
        { name: "JavaScript", color: "F7DF1E" },
      ],
    },
    {
      profileImg: "",
      nickname: "이애옹",
      developmentField: "풀스택",
      techStacks: [
        { name: "React", color: "61DAFB" },
        { name: "JavaScript", color: "F7DF1E" },
        { name: "Spring", color: "6DB33F" },
      ],
    },
  ];
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <div className={style.title}>사용자 검색</div>
          <div className={style.cancelBtn} onClick={closeModal}>
            X
          </div>
        </div>
        <div className={style.searchArea}>
          <input
            type="text"
            placeholder="유저를 검색해보세요"
            className={style.searchInput}
          />
          <img className={style.searchicon} src={searchicon} alt="검색" />
        </div>
        {/* <div className={style.techlp;',././Stack}> */}
        {/* <TechStackBadge name="React" color="61dafb" /> */}
        {/* </div> */}
        <div className={style.userList}>
          {users.map((user) => {
            return (
              <div className={style.userArea}>
                <img
                  src={`${user.profileImg ? user.profileImg : default_profile}`}
                  alt="profile"
                  className={style.profileImg}
                />
                <div>
                  <div className={style.detail}>{user.nickname}</div>
                  <div className={style.secondLine}>
                    <div>{user.developmentField} 개발자</div>
                    <div className={style.techStacks}>
                      {user.techStacks.map((techStack) => (
                        <TechStackBadge
                          name={techStack.name}
                          color={techStack.color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
