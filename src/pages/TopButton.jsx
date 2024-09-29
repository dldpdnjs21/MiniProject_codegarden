import React, { useState, useEffect } from 'react';
import style from './css/TopButton.module.css';

const TopButton = () => {
  const [isVisibleTop, setIsVisibleTop] = useState(false);
  const [isVisibleDown, setIsVisibleDown] = useState(true);

  // 스크롤 감지해서 버튼 표시
  const toggleVisibility = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // 스크롤 위치에 따른 Top 버튼 표시
    if (scrollTop > 150) {
      setIsVisibleTop(true);
    } else {
      setIsVisibleTop(false);
    }

    // 페이지의 끝에 도달했을 때 Down 버튼 숨기기
    if (scrollTop + windowHeight >= fullHeight) {
      setIsVisibleDown(false);
    } else {
      setIsVisibleDown(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={style.topButton}>
      {/* 스크롤 했을 때만 보이는 Top 버튼 */}
      <button
        onClick={scrollToTop}
        className={`${style.scrollBtn} ${isVisibleTop ? '' : style.hidden}`}
      >
        Top
      </button>

      {/* 맨 아래에 있을 때 사라지는 Down 버튼 */}
      <button
        onClick={scrollToBottom}
        className={`${style.scrollBtn} ${isVisibleDown ? '' : style.hidden}`}
      >
        Down
      </button>
    </div>
  );
};

export default TopButton;