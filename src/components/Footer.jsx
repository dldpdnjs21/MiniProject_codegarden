import style from "./css/Footer.module.css";
import logo from "./img/footer_logo.svg";
import users from "./img/users.svg";
import instagram from "./img/Instagram.svg";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src={logo} />
        <p>&copy; 2024 codegarden</p>
      </div>
      <div>
        <div className={style.section}>
          <img src={users}></img>
          <p>김현정 / 이예원</p>
        </div>
        <div className={style.section}>
          <img src={instagram}></img>
          <p>@ghghj_kim / @e__a.on</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
