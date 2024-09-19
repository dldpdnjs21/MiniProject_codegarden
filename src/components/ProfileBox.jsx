import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './css/ProfileBox.module.css';
import profileImg from './img/default_profile.svg';
import { auth, db } from '../pages/firebase/firebase';
import { ref, get } from 'firebase/database';
import { signOut } from 'firebase/auth';

const ProfileBox = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log('사용자 데이터가 존재하지 않습니다.');
        }
      } else {
        console.log('사용자가 로그인되지 않았습니다.');
      }
    };

    fetchUserData();
  }, []);

  const handleClickMypage = () => {
    navigate('/mypage');
  };

  const handleClickLogout = async () => {
    try {
      await signOut(auth);
      console.log('로그아웃 성공');
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className={style.profileContainer}>
      <div className={style.contents}>
        <div className={style.profileWrap}>
          <img src={profileImg} className={style.profileImg} alt="Profile" />
          <div>
            {/* userData가 null인지 확인 */}
            <div className={style.nickname}>
              {userData ? userData.nickname : '닉네임 없음'}
            </div>
            <div className={style.id}>
              {auth.currentUser ? auth.currentUser.email : '이메일 없음'}
            </div>
            <div className={style.field}>
              {userData ? userData.developmentField : '개발 분야 없음'}
            </div>
          </div>
        </div>
        <div>
          <button
            className={`${style.mypage} ${style.btn}`}
            onClick={handleClickMypage}
          >
            My Page
          </button>
        </div>
        <div>
          <button
            className={`${style.logout} ${style.btn}`}
            onClick={handleClickLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;