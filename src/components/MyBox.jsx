import { useState } from "react";
import style from "./css/MyBox.module.css";
import line from "./img/line.svg";
import EditProfile from "./EditProfile";
import MyFeed from "./MyFeed";

const MyBox = () => {
  const [editProfile, setEditProfile] = useState(true);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div
          className={`${style.menu} ${editProfile ? style.active : ""}`}
          //   className={editProfile ? style.active : ""}
          onClick={() => {
            setEditProfile(true);
          }}
        >
          프로필 수정
        </div>
        <img src={line} />
        <div
          className={`${style.menu} ${editProfile ? "" : style.active}`}
          onClick={() => {
            setEditProfile(false);
          }}
        >
          내 피드
        </div>
      </div>
      {editProfile ? <EditProfile /> : <MyFeed />}
    </div>
  );
};
export default MyBox;
