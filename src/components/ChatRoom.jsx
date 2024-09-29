import React, { useState, useEffect, useRef } from "react";
import { ref as dbRef, onValue, set } from "firebase/database";
import { db } from "../pages/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import style from "./css/ChatRoom.module.css";
import default_profile from "./img/default_profile.svg";
import paper_plane from "./img/paper_plane.svg";
import { FaImage } from "react-icons/fa";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";

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
  const navigate = useNavigate();

  // 현재 로그인한 유저의 uid 및 상대 유저 uid 가져오기
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
        const otherUid =
          userIds.find((uid) => uid !== currentUid) || currentUid;
        setOtherUserUid(otherUid);
        console.log("otherUserUid:", otherUid);

        // 채팅방 참여자들 정보 가져오기
        userIds.forEach((userId) => {
          if (!userInfos[userId]) {
            const userRef = dbRef(db, `users/${userId}`);
            onValue(userRef, (userSnapshot) => {
              const userData = userSnapshot.val();
              if (userData) {
                setUserInfos((prevUserInfos) => ({
                  ...prevUserInfos,
                  [userId]: userData,
                }));
              }
            });
          }
        });
      }
    });
  }, [roomId, userInfos]);

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
      }
    });
  }, [roomId]);

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (!newMessage.trim() && !imageFile) return;

    const messageId = Date.now().toString();
    const messagesRef = dbRef(db, `chatrooms/${roomId}/messages/${messageId}`);

    let imageUrl = "";

    if (imageFile) {
      const storage = getStorage();
      const imageRef = storageRef(
        storage,
        `chatrooms/${roomId}/images/${imageFile.name}`
      );
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

  const pressEnter = (e) => {
    if (e.nativeEvent.isComposing) {
      // isComposing 이 true 이면
      return; // 조합 중이므로 동작을 막는다.
    }

    if (e.key === "Enter" && e.shiftKey) {
      // [shift] + [Enter] 치면 걍 리턴
      return;
    } else if (e.key === "Enter") {
      // [Enter] 치면 메시지 보내기
      handleSendMessage(e);
    }
  };

  const handleClickUser = () => {
    // profile 페이지로 이동하면서 param값으로 해당 유저 uid 보내기
    navigate("/profile", { state: { userId: otherUserUid } });
  };
  return (
    <div className={style.chatRoom}>
      <div className={style.chatUser} onClick={handleClickUser}>
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
                <div className={style.markdown}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {message.text}
                  </ReactMarkdown>
                </div>
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
          <span onClick={handleRemoveFile} className={style.removeFileButton}>
            X
          </span>
        </div>
      )}
      <div className={style.inputArea}>
        <TextareaAutosize
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={pressEnter}
          placeholder="메시지를 입력하세요... (코드는 마크다운 문법으로 작성)"
          className={style.messageInput}
          maxRows={3}
        />
        {/* </div> */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <div className={style.buttonArea}>
          <button onClick={handleImageUpload} className={style.fileButton}>
            <FaImage className={style.icon} />
          </button>
          <button onClick={handleSendMessage} className={style.sendButton}>
            <img src={paper_plane} alt="전송" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
