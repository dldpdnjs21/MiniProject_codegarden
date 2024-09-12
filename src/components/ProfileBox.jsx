import { useNavigate } from "react-router-dom";
import style from "./css/ProfileBox.module.css";
import profileImg from "./img/default_profile.svg";
const ProfileBox = () => {
  const navigate = useNavigate();
  const handleClickMypage = () => {
    navigate("/mypage");
  };

  const handleClickLogout = () => {
    console.log("logout 버튼 클릭");
  };

  return (
    <div className={style.profileContainer}>
      <div className={style.contents}>
        <div className={style.profileWrap}>
          <img src={profileImg} className={style.profileImg} />
          <div>
            <div className={style.nickname}>코드가든</div>
            <div className={style.id}>codegarden</div>
            <div className={style.field}>프론트엔드 개발자</div>
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
