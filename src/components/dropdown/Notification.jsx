import style from "../css/Notification.module.css";

const Notification = ({ useRef }) => {
  return (
    <div ref={useRef} className={style.notificationDropdown}>
      <div className={style.notiHeader}>알림</div>
      <ul>
        <li>알림 1</li>
        <li>알림 2</li>
        <li>알림 3</li>
      </ul>
    </div>
  );
};

export default Notification;
