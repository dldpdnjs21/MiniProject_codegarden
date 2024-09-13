import { useEffect, useState } from "react";

const useDetectClose = (elem, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClickOutside = (e) => {
      // elem이 유효하고, 해당 요소 내부를 클릭하지 않았을 경우
      if (elem.current && !elem.current.contains(e.target)) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    // 드롭다운이 열려있을 때만 이벤트 리스너 추가
    if (isOpen) {
      window.addEventListener("click", onClickOutside);
    }

    // 리스너를 정리하는 부분
    return () => {
      window.removeEventListener("click", onClickOutside);
    };
  }, [isOpen, elem]);

  return [isOpen, setIsOpen];
};

export default useDetectClose;
