import { getAuth } from "firebase/auth";
import style from "../css/Notification.module.css";
import { useEffect, useState } from "react";
import { db } from "../../pages/firebase/firebase";
import { ref as dbRef, get } from "firebase/database";

const Notification = ({ useRef }) => {
  const [feedNoti, setFeedNoti] = useState({});
  const [requestNoti, setRequestNoti] = useState([]);

  const fetchNotification = async (uid) => {
    const notiRef = dbRef(db, `notifications/${uid}`);
    const snapshot = await get(notiRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(`Fetched notifications: ${JSON.stringify(data.feedReview)}`);
      setFeedNoti(data.feedReview);
      // Object.values(notifications).forEach((notification) => {
      //   setFeedNoti(notification.contents);
      // });
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    let uid;
    if (user) {
      uid = user.uid;
      console.log(uid);
    }

    fetchNotification(uid);
    // 리뷰 도착 알림 가져오기
    // 리뷰 요청 알림 가져오기
  }, []);

  return (
    <div ref={useRef} className={style.notificationDropdown}>
      <div className={style.notiHeader}>알림</div>
      <div className={style.scrollable}>
        <div className={style.notiTitle}>리뷰 도착</div>
        <ul>
          {Object.values(feedNoti).map((notification, index) => (
            <li key={index}>{notification.contents}</li>
          ))}
        </ul>

        <div className={style.notiTitle}>리뷰 요청</div>
        <ul>
          <li>알림 1</li>
          <li>알림 2</li>
          <li>알림 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Notification;
