import React, { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, set } from "firebase/database";
import { db } from "../pages/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import style from "./css/ChatRoom.module.css";
import default_profile from "./img/default_profile.svg";
import paper_plane from "./img/paper_plane.svg";
import { FaImage } from "react-icons/fa";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userInfos, setUserInfos] = useState({});
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [otherUserUid, setOtherUserUid] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(""); // 업로드한 파일 이름 상태 추가
  const fileInputRef = useRef(null);

  // 현재 로그인한 유저의 uid 가져오기
  useEffect(() => {
    const auth = getAuth();
    const currentUid = auth.currentUser?.uid;
    setCurrentUserUid(currentUid);

    const chatroomRef = dbRef(db, `chatrooms/${roomId}`);
    onValue(chatroomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData) {
        console.log("Participants:", roomData.users);
        const userIds = Object.keys(roomData.users);
        const otherUid = userIds.find((uid) => uid !== currentUid) || "";
        setOtherUserUid(otherUid);
        console.log("otherUserUid:", otherUid);
      }
    });
  }, [roomId]);

  // 채팅 메시지 및 유저정보 불러오기
  useEffect(() => {
    const messagesRef = dbRef(db, `chatrooms/${roomId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.entries(data).map(([id, message]) => ({
          id,
          ...message,
        }));
        setMessages(messagesArray);

        messagesArray.forEach((message) => {
          const { senderId } = message;
          if (!userInfos[senderId]) {
            const userRef = dbRef(db, `users/${senderId}`);
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
    if (!newMessage.trim() && !imageFile) return;

    const messageId = Date.now().toString();
    const messagesRef = dbRef(db, `chatrooms/${roomId}/messages/${messageId}`);
    
    let imageUrl = "";

    if (imageFile) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `chatrooms/${roomId}/images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    await set(messagesRef, {
      senderId: currentUserUid,
      text: newMessage,
      image: imageUrl,
      timestamp: Date.now(),
    });

    setNewMessage("");
    setImageFile(null);
    setUploadedFileName("");
  };

  // 이미지 선택
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  // 파일 이름 변경
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUploadedFileName(file.name);
    }
  };
   // 업로드한 파일 삭제
   const handleRemoveFile = () => {
    setImageFile(null); 
    setUploadedFileName("");
  };

  const messagesEndRef = useRef(null);

  // 최신 메시지로 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  return (
    <div className={style.chatRoom}>
      <div className={style.chatUser}>
        <img
          src={default_profile}
          className={style.chatProfile}
          alt="프로필 이미지"
        />
        <span className={style.chatNickname}>
          {userInfos[otherUserUid]?.nickname || "받는 사람"}
        </span>
      </div>
      <div className={style.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.senderId === currentUserUid
                ? style.myMessageContainer
                : style.otherMessageContainer
            }
          >
            <div className={style.message}>
              <div className={style.sender}>
                {userInfos[message.senderId]?.nickname || "보내는 사람"}
              </div>
              <div className={style.messageText}>
                {message.text}
                {message.image && (
                  <img
                    src={message.image}
                    alt="첨부된 이미지"
                    className={style.messageImage}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
         <div ref={messagesEndRef} /> {/* 메시지 끝*/}
      </div>
      {uploadedFileName && ( // 업로드한 파일 이름 표시
        <div className={style.uploadedFileName}>
          업로드한 파일: {uploadedFileName}
          <span onClick={handleRemoveFile} className={style.removeFileButton}>X</span>
        </div>
      )}
      <div className={style.inputArea}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className={style.messageInput}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button onClick={handleImageUpload} className={style.fileButton}>
          <FaImage className={style.icon} />
        </button>
        <button onClick={handleSendMessage} className={style.sendButton}>
          <img src={paper_plane} alt="채팅 시작" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;