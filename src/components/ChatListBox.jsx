import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref as dbRef, onValue } from 'firebase/database';
import { db } from '../pages/firebase/firebase';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set } from "firebase/database";
import style from './css/ChatListBox.module.css';
import profileImg from './img/default_profile.svg';

const ChatListBox = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [currentUserUid, setCurrentUserUid] = useState(""); // 현재 유저 UID
  const [userInfos, setUserInfos] = useState({}); // 상대 유저 정보 상태

  // 현재 로그인한 유저 UID 가져오기
  useEffect(() => {
    const auth = getAuth();
    const currentUid = auth.currentUser?.uid;
    setCurrentUserUid(currentUid);

    const chatroomsRef = dbRef(db, 'chatrooms');
    onValue(chatroomsRef, (snapshot) => {
      const data = snapshot.val();
      const userChatRooms = [];

      if (data) {
        Object.entries(data).forEach(([roomId, roomData]) => {
          if (roomData.users && roomData.users[currentUid]) {
            userChatRooms.push({ roomId, ...roomData });

            // 상대 유저 UID 가져오기
            const otherUid = Object.keys(roomData.users).find(uid => uid !== currentUid);
            if (otherUid) {
              // 상대 유저 정보 가져오기
              const userRef = dbRef(db, `users/${otherUid}`);
              onValue(userRef, (userSnapshot) => {
                const userData = userSnapshot.val();
                if (userData) {
                  setUserInfos(prevUserInfos => ({
                    ...prevUserInfos,
                    [roomId]: { ...userData }
                  }));
                }
              });
            }
          }
        });
      }

      setChatRooms(userChatRooms); // 채팅방 상태 업데이트
    });
  }, []);

  const handleClickChatRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

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
                  const lastMessage = lastMessageObj ? lastMessageObj.text : "";
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
          //       // 마지막 메시지 가져오기
          //       const lastMessage = chatRoom.messages
          //         ? Object.values(chatRoom.messages).pop().text
          //         : "";

          //       // 필요한 정보만 저장
          //       setChatRooms((prevChatRooms) => ({
          //         ...prevChatRooms,
          //         [chatRoomId]: {
          //           otherUserUid: otherUid,
          //           otherUserNickname: nickname,
          //           otherUserProfileImg: profileImg,
          //           lastMessage: lastMessage,
          //         },
          //       }));
          //     } else {
          //       console.log(`상대 유저 프로필을 찾을 수 없음: ${otherUid}`);
          //     }
          //   } else {
          //     console.log("현재 사용자가 속해 있지 않은 채팅방");
          //   }
          // });
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
        <p className={style.chatTitle}>채팅방 목록</p>
      </div>
      <div className={style.contents}>
        {chatRooms.length === 0 ? (
          <p>참여 중인 채팅방이 없습니다.</p>
        ) : (
          chatRooms.map((room) => {
            const otherUser = userInfos[room.roomId];

            return (
              <div
                key={room.roomId}
                className={style.profileWrap}
                onClick={() => handleClickChatRoom(room.roomId)}
              >
                <img src={profileImg} className={style.profileImg} alt="프로필 이미지" />
                <div>
                  <div className={style.nickname}>
                    {otherUser?.nickname || "익명"} {/* 다른 유저의 닉네임 표시 */}
                  </div>
                  <div className={style.chatText}>
                    {room.lastMessage || "최근 메시지 없음"} {/* 마지막 메시지 표시 */}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatListBox;