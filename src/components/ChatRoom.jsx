import React, { useState, useEffect } from "react";
import { db } from "../pages/firebase/firebase";
import { ref, onValue, set } from "firebase/database";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import style from "./css/ChatRoom.module.css";
import default_profile from "./img/default_profile.svg";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [nicknames, setNicknames] = useState({});
  const [userInfos, setUserInfos] = useState({});
  const [currentUserUid, setCurrentUserUid] = useState("");

  // 현재 로그인한 유저의 uid 가져오기
  useEffect(() => {
    const auth = getAuth();
    setCurrentUserUid(auth.currentUser?.uid);
  }, []);

  // 채팅 메시지 및 닉네임 불러오기
  // useEffect(() => {
  //   const messagesRef = ref(db, `chatrooms/${roomId}/messages`);
  //   onValue(messagesRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const messagesArray = Object.entries(data).map(([id, message]) => ({
  //         id,
  //         ...message,
  //       }));
  //       setMessages(messagesArray);

  //       // 메시지에서 각 senderId로 닉네임 조회
  //       messagesArray.forEach((message) => {
  //         const { senderId } = message;
  //         if (!nicknames[senderId]) {
  //           const userRef = ref(db, `users/${senderId}`);
  //           onValue(userRef, (userSnapshot) => {
  //             const userData = userSnapshot.val();
  //             if (userData && userData.nickname) {
  //               setNicknames((prevNicknames) => ({
  //                 ...prevNicknames,
  //                 [senderId]: userData.nickname,
  //               }));
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }, [roomId, nicknames]);

  // 채팅 메시지 및 유저정보 불러오기
  useEffect(() => {
    const messagesRef = ref(db, `chatrooms/${roomId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.entries(data).map(([id, message]) => ({
          id,
          ...message,
        }));
        setMessages(messagesArray);

        // 메시지에서 각 senderId로 닉네임 조회
        messagesArray.forEach((message) => {
          const { senderId } = message;
          if (!userInfos[senderId]) {
            const userRef = ref(db, `users/${senderId}`);
            onValue(userRef, (userSnapshot) => {
              const userData = userSnapshot.val();

              if (userData) {
                setUserInfos((prevUserInfos) => ({
                  ...prevUserInfos,
                  [senderId]: userData,
                }));
              }
            });
          }
        });
      }
    });
  }, [roomId, userInfos]);

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageId = Date.now().toString();
    const messagesRef = ref(db, `chatrooms/${roomId}/messages/${messageId}`);

    await set(messagesRef, {
      senderId: currentUserUid, // 현재 로그인한 유저 uid
      text: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  return (
    <div className={style.chatRoom}>
      <div className={style.messages}>
        {messages.map((message) => (
          <div key={message.id} className={style.message}>
            {/* <span className={style.sender}>{nicknames[message.senderId]}:</span> */}
            <div className={style.sender}>
              <img
                src={userInfos[message.senderId]?.profileImg || default_profile}
              />
              {userInfos[message.senderId]?.nickname}:
            </div>
            {message.text}
          </div>
        ))}
      </div>
      <div className={style.inputArea}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className={style.messageInput}
        />
        <button onClick={handleSendMessage} className={style.sendButton}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
