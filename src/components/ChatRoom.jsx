import React, { useState, useEffect } from "react";
import { db } from "../pages/firebase/firebase";
import { ref, onValue, set } from "firebase/database";
import { useParams } from "react-router-dom";
import "./css/ChatRoom.module.css";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [nicknames, setNicknames] = useState({});

  const currentUserUid = "yourCurrentUserUID"; // 현재 로그인한 유저의 uid

  // 채팅 메시지 및 닉네임 불러오기
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
          if (!nicknames[senderId]) {
            const userRef = ref(db, `users/${senderId}`);
            onValue(userRef, (userSnapshot) => {
              const userData = userSnapshot.val();
              if (userData && userData.nickname) {
                setNicknames((prevNicknames) => ({
                  ...prevNicknames,
                  [senderId]: userData.nickname,
                }));
              }
            });
          }
        });
      }
    });
  }, [roomId, nicknames]);

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
    <div className="chatRoom">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="sender">
              {nicknames[message.senderId]}:
            </span>
            {message.text}
          </div>
        ))}
      </div>
      <div className="inputArea">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="messageInput"
        />
        <button onClick={handleSendMessage} className="sendButton">
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;