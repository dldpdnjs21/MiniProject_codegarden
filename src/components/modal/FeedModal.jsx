import React, { useState } from "react";
import style from "../css/FeedModal.module.css";
import { FaPaperclip, FaImage, FaCode } from "react-icons/fa";

const FeedModal = ({ isOpen, closeModal }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <form>
          <div>
            <input type="text" placeholder="제목을 입력하세요" className={style.modalInput} />
          </div>
          <div>
            <select className={style.modalSelect}>
              <option value="" disabled selected>
                사용언어
              </option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
            </select>
          </div>
          <div>
            <textarea
              placeholder="피드백이 필요한 당신의 코드를 작성해주세요"
              className={style.modalTextarea}
            />
          </div>
          <div className={style.modalBottom}>
            <div className={style.modalFile}>
              <button type="button" className={style.modalFileButton}>
                <label htmlFor="file-upload" className={style.iconLabel}>
                  <FaPaperclip className={style.icon} />
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className={style.fileInput}
                  />
                </label>
              </button>
              <button type="button" className={style.modalFileButton}>
                <label htmlFor="image-upload" className={style.iconLabel}>
                  <FaImage className={style.icon} />
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={style.fileInput}
                  />
                </label>
              </button>
              <button type="button" className={style.modalFileButton}>
                <label htmlFor="code-block" className={style.iconLabel}>
                  <FaCode className={style.icon} />
                  <input
                    type="file"
                    id="code-block"
                    className={style.fileInput}
                    disabled
                  />
                </label>
              </button>
            </div>
            <div className={style.modalActions}>
              <button type="button" onClick={closeModal} className={style.modalCancelButton}>
                취소
              </button>
              <button type="submit" className={style.modalSubmitButton}>
                등록
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedModal;