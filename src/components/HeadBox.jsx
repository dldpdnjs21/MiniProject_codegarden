import { useState } from "react";
import style from "./css/HeadBox.module.css";
import searchicon from './img/searchicon.svg';
import FeedModal from "./modal/FeedModal";

const HeadBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.headContainer}>
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        className={style.searchInput}
      />
      <img className={style.searchicon} src={searchicon} alt="검색" />
      <button className={style.addFeedButton} onClick={openModal}>
        피드작성
      </button>

      <FeedModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default HeadBox;