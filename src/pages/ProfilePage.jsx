// ProfilePage.jsx
// 다른 유저 프로필 조회 페이지
import React, { useEffect, useState } from "react";
import ProfileBox from "../components/ProfileBox";
import style from "./css/ProfilePage.module.css";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { db } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import back from "./img/profile_background.svg";
import default_profile from "../components/img/default_profile.svg";
import TechStackBadge from "../components/TechStackBadge";
import ChatListBox from "../components/ChatListBox";

const ProfilePage = () => {
  // navigate param 값 가져오기
  const { state } = useLocation();
  const { userId } = state;
  console.log(userId);
  const navigate = useNavigate();

  // 해당 유저 정보 가져오기
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        // const userData = snapshot.val();
        setUserData(snapshot.val());
        // setFormData({
        //   nickname: userData.nickname,
        //   developmentField: userData.developmentField || "",
        //   techStacks: userData.techStacks || [],
        //   introduce: userData.introduce || "",
        // });
        // setCheckedList(userData.techStacks || []);
        // setIntroduceCnt(userData.introduce ? userData.introduce.length : 0);
      }
    });
  }, [userId]);

  const handleClickDM = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const roomId =
      currentUser.uid > userId
        ? `${currentUser.uid}_${userId}`
        : `${userId}_${currentUser.uid}`;
    const chatRoomRef = ref(db, `chatrooms/${roomId}`);
    const snapshot = await get(chatRoomRef);

    try {
      if (!snapshot.exists()) {
        await set(chatRoomRef, {
          users: {
            [currentUser.uid]: true,
            [userId]: true,
          },
          createdAt: Date.now(),
          lastMessage: "",
          lastMessageTime: null,
        });
      }
      navigate(`/ChatRoom/${roomId}`);
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className={style.wrap}>
      <div className={style.contentsContainer}>
        <div>
          <ProfileBox />
          <ChatListBox />
        </div>

        <div className={style.infoBox}>
          <div className={style.back}>
            <img src={back} alt="background"></img>
            <p>프로필</p>
          </div>
          <img
            src={userData?.profileImg || default_profile}
            alt="profile image"
            className={style.profileImg}
          />
          <div className={style.infoWrap}>
            <div className={style.nickname}>{userData.nickname}</div>
            <div className={style.devField}>{userData.developmentField}</div>
            <div className={style.title}>기술스택</div>
            {userData.techStacks?.length ? (
              <div className={style.stackList}>
                {userData.techStacks.map((item) => (
                  <TechStackBadge
                    key={item.name}
                    name={item.name}
                    color={item.color}
                  />
                ))}
              </div>
            ) : (
              <p className={style.notice}>기술스택이 없습니다</p>
            )}
            <div className={style.title}>소개글</div>

            {userData.introduce?.length > 0 ? (
              <p>{userData.introduce}</p>
            ) : (
              <p className={style.notice}>소개글이 없습니다</p>
            )}

            <button className={style.dmBtn} onClick={handleClickDM}>
              Direct Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
