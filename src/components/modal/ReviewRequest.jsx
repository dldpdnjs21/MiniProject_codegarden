import React, { useState, useEffect } from "react";
import { ref as dbRef, get, set } from "firebase/database";
import { db } from "../../pages/firebase/firebase";
import { getAuth } from "firebase/auth"; // 추가
import { useNavigate } from "react-router-dom"; 
import style from "../css/ReviewRequest.module.css";
import searchicon from "../img/searchicon.svg";
import TechStackBadge from "../TechStackBadge";
import default_profile from "../img/default_profile.svg";
import paper_plane from "../img/paper_plane.svg";

const ReviewRequest = ({ isOpen, closeModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate(); 

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
        
        const usersArray = Object.entries(data).map(([uid, user]) => ({
          uid,
          ...user
        }));
    
        const filtered = usersArray.filter((user) => {
          const nickname = user.nickname ? user.nickname.toLowerCase() : "";
          const devField = user.developmentField
            ? user.developmentField.toLowerCase()
            : "";
    
          return nickname.includes(searchQuery.toLowerCase()) || devField.includes(searchQuery.toLowerCase());
        });
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers([]);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRequestClick = async (uid) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const roomId = currentUser.uid > uid ? `${currentUser.uid}_${uid}` : `${uid}_${currentUser.uid}`;
    const chatRoomRef = dbRef(db, `chatrooms/${roomId}`);
    const snapshot = await get(chatRoomRef);

    try {
      if (!snapshot.exists()) {
        await set(chatRoomRef, {
          users: {
            [currentUser.uid]: true,
            [uid]: true,
          },
          createdAt: Date.now(),
          lastMessage: '',
          lastMessageTime: null,
        });
      }
      navigate(`/ChatRoom/${roomId}`);
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <div className={style.title}>리뷰 요청</div>
          <div className={style.cancelBtn} onClick={closeModal}>
            X
          </div>
        </div>
        <div className={style.searchArea}>
          <input
            type="text"
            placeholder="리뷰어를 찾아보세요"
            className={style.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img className={style.searchicon} src={searchicon} alt="검색" />
        </div>

        <div className={style.userList}>
          {filteredUsers.length === 0 && searchQuery.trim() !== " " ? (
            <p className={style.nouser}>코드가든에서 리뷰를 요청해보세요</p>
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

                <button 
                  type="button" 
                  className={style.requestButton} 
                  onClick={() => handleRequestClick(user.uid)} 
                >
                  <img src={paper_plane} alt="채팅 시작" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewRequest;