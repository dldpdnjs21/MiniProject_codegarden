import React, { useState, useEffect } from "react";
import { ref as dbRef, get } from "firebase/database";
import { db } from "../../pages/firebase/firebase";
import style from "../css/SearchUser.module.css";
import searchicon from "../img/searchicon.svg";
import TechStackBadge from "../TechStackBadge";
import default_profile from "../img/default_profile.svg";

const SearchUser = ({ isOpen, closeModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.trim() === "") {
        setFilteredUsers([]);
        return;
      }

      const usersRef = dbRef(db, "users");
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.values(data);

        const filtered = usersArray.filter((user) => {
          const nickname = user.nickname ? user.nickname.toLowerCase() : "";
          const devField = user.developmentField ? user.developmentField.toLowerCase() : "";
        
          const nicknameMatch = nickname.includes(searchQuery.toLowerCase());
          const devFieldMatch = devField.includes(searchQuery.toLowerCase());
        
          return nicknameMatch || devFieldMatch;
        });
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers([]); // 데이터가 없을 때는 빈 배열
      }
    };

    fetchUsers();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!isOpen) return null;

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
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img className={style.searchicon} src={searchicon} alt="검색" />
        </div>

        <div className={style.userList}>
          {filteredUsers.length === 0 && searchQuery.trim() !== " " ? (
            <p className={style.nouser}>코드가든에서 리뷰어를 찾아보세요</p>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.uid} className={style.userArea}>
                <img
                  src={user.profileImg || default_profile}
                  alt="profile"
                  className={style.profileImg}
                />
                <div className={style.username}>
                  <div className={style.detail}>{user.nickname}</div>
                  <div className={style.devtype}>{user.developmentField}</div>
                </div>
                <div className={style.techStacks}>
                  {user.techStacks.map((techStack) => (
                    <TechStackBadge
                      key={techStack.name}
                      name={techStack.name}
                      color={techStack.color}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;