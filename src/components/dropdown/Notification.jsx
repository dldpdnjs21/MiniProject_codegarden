import style from "../css/Notification.module.css";

const Notification = ({ useRef }) => {
  return (
    <div ref={useRef} className={style.notificationDropdown}>
      <div className={style.notiHeader}>알림</div>
      <div className={style.scrollable}>
        <div className={style.notiTitle}>리뷰 도착</div>
        <ul>
          <li>알림 1</li>
          <li>알림 2</li>
          <li>알림 3</li>
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
