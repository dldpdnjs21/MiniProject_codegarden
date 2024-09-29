import { getAuth } from "firebase/auth";
import style from "../css/Notification.module.css";
import { useEffect, useState } from "react";
import { db } from "../../pages/firebase/firebase";
import { ref as dbRef, get } from "firebase/database";
import line from "../img/line.svg";
import { useNavigate } from "react-router-dom";

const Notification = ({ useRef }) => {
  const [feedNoti, setFeedNoti] = useState({});
  const [requestNoti, setRequestNoti] = useState({});
  const [notiToggle, setNotiToggle] = useState(true);

  const fetchNotification = async (uid) => {
    const notiRef = dbRef(db, `notifications/${uid}`);
    const snapshot = await get(notiRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // console.log(`Fetched notifications: ${JSON.stringify(data.feedReview)}`);
      // console.log(`Fetched notifications: ${JSON.stringify(data.reviewReq)}`);
      if (data.feedReview) {
        // feedReview 객체를 배열로 변환하고 뒤집은 후 다시 객체로 변환
        const reversedFeedReview = Object.fromEntries(
          Object.entries(data.feedReview).reverse()
        );
        setFeedNoti(reversedFeedReview);
      }
      if (data.reviewReq) {
        const reversedReviewReq = Object.fromEntries(
          Object.entries(data.reviewReq).reverse()
        );
        setRequestNoti(reversedReviewReq);
      }
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

  const navigate = useNavigate();
  const handleClickReqNoti = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div ref={useRef} className={style.notificationDropdown}>
      <div className={style.notiHeader}>알림</div>
      {/* <div className={style.scrollable}> */}
      <div className={style.titleArea}>
        <div
          className={`${style.notiTitle} ${notiToggle ? style.active : ""}`}
          // className={notiToggle ? style.active : ""}
          onClick={() => setNotiToggle((prev) => !prev)}
        >
          리뷰 도착
        </div>
        <img src={line} style={{ height: "14px" }} />
        <div
          className={`${style.notiTitle} ${notiToggle ? "" : style.active}`}
          // className={notiToggle ? "" : style.active}
          onClick={() => setNotiToggle((prev) => !prev)}
        >
          리뷰 요청
        </div>
      </div>
      <div className={style.scrollable}>
        {notiToggle ? (
          <ul>
            {Object.keys(feedNoti).length > 0 ? (
              Object.values(feedNoti).map((notification, index) => (
                <li key={index}>{notification.contents}</li>
              ))
            ) : (
              <li>알림이 없습니다</li>
            )}
          </ul>
        ) : (
          <ul>
            {Object.keys(requestNoti).length > 0 ? (
              Object.values(requestNoti).map((notification, index) => (
                <li
                  key={index}
                  onClick={() => handleClickReqNoti(notification.chatRoomId)}
                >
                  {notification.contents}
                </li>
              ))
            ) : (
              <li>알림이 없습니다</li>
            )}
          </ul>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Notification;
