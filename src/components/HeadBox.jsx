//검색어창 + 피드작성
import style from "./css/HeadBox.module.css";
import searchicon from './img/searchicon.svg'
const HeadBox = () => {
  return (
    <div className={style.headContainer}>
      <input 
      type="text"
      placeholder="검색어를 입력해주세요."
      className={style.searchInput} />
      <img className={style.searchicon} src={searchicon} />
      <button className={style.addFeedButton}>피드작성</button>
    </div>
  );
};

export default HeadBox;
