import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './css/ChatListBox.module.css';
import profileImg from './img/default_profile.svg';

const ChatListBox = () => {
  const navigate = useNavigate();
  
  const handleClickChatRoom = () => {
    navigate('/chatroom');
  }

  return (
    <div className={style.chatlistContainer}>
      <div className={style.chatlistHeader}>
        <p className={style.chatTitle} onClick={handleClickChatRoom}>채팅방</p>
      </div>
      <div className={style.contents}>
        <div className={style.profileWrap}>
          <img src={profileImg} className={style.profileImg} />
          <div>
            <div className={style.nickname}>
              먹짱애옹
            </div>
            <div className={style.chatText}>
            안녕하세요 유플러스 신입 개발자 코드가...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListBox;