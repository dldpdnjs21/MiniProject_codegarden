import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { db } from "../pages/firebase/firebase";
import style from "./css/ChatListBox.module.css";
import profileImg from "./img/default_profile.svg";

const ChatListBox = () => {
  const navigate = useNavigate();

  const handleClickChatRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  const [chatRooms, setChatRooms] = useState({});

  useEffect(() => {
    const fetchChatRooms = async (currentUser) => {
      try {
        const chatRoomRef = ref(db, "chatrooms");
        const snapshot = await get(chatRoomRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const chatRoomsData = await Promise.all(
            Object.keys(data).map(async (chatRoomId) => {
              const chatRoom = data[chatRoomId];
              // users 객체가 있는지 확인
              if (!chatRoom.users) {
                console.log(`채팅방 ${chatRoomId}에 users 정보가 없습니다.`);
                return null;
              }
              const users = chatRoom.users;

              // 현재 사용자가 채팅방에 속해 있는지 확인
              if (users[currentUser.uid]) {
                console.log(`채팅방 있음 : ${chatRoomId}`);

                // 상대방 UID를 찾음 (자신이 아닌 UID)
                let otherUid = Object.keys(users).find(
                  (uid) => uid !== currentUser.uid
                );

                // 나와의 채팅일 경우
                if (!otherUid) {
                  otherUid = currentUser.uid;
                }

                // 상대방 프로필 정보 가져오기
                const otherUserProfileRef = ref(db, `users/${otherUid}`);
                const otherUserSnapshot = await get(otherUserProfileRef);

                if (otherUserSnapshot.exists()) {
                  const otherUserProfile = otherUserSnapshot.val();
                  const { nickname, profileImg } = otherUserProfile;

                  // 마지막 메시지 가져오기
                  const lastMessageObj = chatRoom.messages
                    ? Object.values(chatRoom.messages).pop()
                    : null;
                  let lastMessage = lastMessageObj ? lastMessageObj.text : "";
                  if (lastMessage?.length > 30) {
                    lastMessage = lastMessage.substring(0, 30) + "...";
                  }
                  const lastMessageTimestamp = lastMessageObj
                    ? lastMessageObj.timestamp
                    : 0; // 메시지가 없으면 0으로 설정

                  // 필요한 정보만 저장 (정렬 기준 포함)
                  return {
                    chatRoomId,
                    otherUserUid: otherUid,
                    otherUserNickname: nickname,
                    otherUserProfileImg: profileImg,
                    lastMessage: lastMessage,
                    lastMessageTimestamp: lastMessageTimestamp,
                  };
                } else {
                  console.log(`상대 유저 프로필을 찾을 수 없음: ${otherUid}`);
                  return null;
                }
              } else {
                console.log("현재 사용자가 속해 있지 않은 채팅방");
                return null;
              }
            })
          );

          // null 값 필터링 및 최신 메시지 기준으로 정렬
          const sortedChatRooms = chatRoomsData
            .filter((room) => room !== null)
            .sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp); // 최신순으로 정렬

          // 정렬된 데이터를 상태에 저장
          const formattedChatRooms = sortedChatRooms.reduce((acc, room) => {
            acc[room.chatRoomId] = room;
            return acc;
          }, {});

          setChatRooms(formattedChatRooms);
        } else {
          console.log("No chat rooms found");
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    const auth = getAuth();

    // Firebase 인증 상태 변경을 감지
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("현재 사용자:", user.uid);
        fetchChatRooms(user); // 인증된 사용자를 기준으로 채팅방 가져오기
      } else {
        console.log("사용자가 로그인되어 있지 않습니다.");
      }
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => unsubscribe();
  }, []);

  //상대 유저 프로필, 닉네임, 마지막 메세지 내용 가져오기

  return (
    <div className={style.chatlistContainer}>
      <div className={style.chatlistHeader}>
        <p className={style.chatTitle}>채팅방</p>
      </div>
      <div className={style.chatRoomList}>
        {chatRooms && Object.keys(chatRooms).length > 0 ? (
          Object.entries(chatRooms).map(([roomId, roomInfo]) => (
            <div
              key={roomId}
              className={style.roomInfo}
              onClick={() => handleClickChatRoom(roomId)}
            >
              {/* 프로필 이미지 */}
              <img
                src={roomInfo?.otherUserProfileImg || profileImg}
                className={style.profileImg}
                alt="Profile"
              />
              <div>
                <div className={style.nickname}>{roomInfo.otherUserNickname}</div>
                <div className={style.chatText}>
                  {roomInfo.lastMessage || "대화가 없습니다"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={style.noChatRoom}>채팅방이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ChatListBox;
