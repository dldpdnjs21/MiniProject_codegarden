import React, { useState, useEffect } from "react";
import style from "../css/FeedModal.module.css";
import { FaImage, FaCode } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../pages/firebase/firebase";
import { ref as dbRef, set, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FeedModal = ({ isOpen, closeModal }) => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [uid, setUid] = useState("");

  // 코드블럭 삽입시 피드 content에 삽입되도록
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && title && language && content) {
      const storageRef = ref(storage, `images/${file.name}`);
      // 이미지를 Storage에 업로드
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageURL(url);

      // 제목, 사용 언어, 피드 내용, 이미지 URL, 작성자 uid를 Database에 저장
      const feedRef = dbRef(db, `feeds/${Date.now()}`);
      const createdAt = new Date().toISOString();
      await set(feedRef, {
        title: title,
        language: language,
        content: content,
        imageUrl: url,
        createdAt: createdAt,
        // nickname: nickname,
        authorUid: uid,
      });

      setTitle("");
      setLanguage("");
      setContent("");
      setFile(null);
      setFileName("");
      closeModal();
      // 페이지 리로드
      window.location.reload();
    } else {
      console.log("모든 필드를 입력하세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className={style.modalInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={style.modalSelect}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="" disabled>
                사용언어
              </option>
              <option value="JavaScript">JavaScript</option>
              <option value="HTML">HTML</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
              <option value="PHP">PHP</option>
              <option value="C++">C++</option>
              <option value="TypeScript">TypeScript</option>
              <option value="SQL">SQL</option>
              <option value="Ruby">Ruby</option>
              <option value="Swift">Swift</option>
              <option value="Go">Go</option>
              <option value="Kotlin">Kotlin</option>
              <option value="Rust">Rust</option>
              <option value="Dart">Dart</option>
              <option value="R">R</option>
            </select>
          </div>
          <div>
            <textarea
              placeholder="피드백이 필요한 당신의 코드를 작성해주세요"
              className={style.modalTextarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className={style.modalBottom}>
            <div className={style.modalFile}>
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
                  />
                </label>
              </button>
              {fileName && (
                <div className={style.fileInfo}>
                  <span className={style.fileName}>첨부파일 : {fileName}</span>
                  <a
                    onClick={() => {
                      setFile(null);
                      setFileName("");
                      document.getElementById("image-upload").value = null;
                    }}
                    className={style.fileRemoveButton}
                  >
                    x
                  </a>
                </div>
              )}
            </div>
            <div className={style.modalActions}>
              <button
                type="button"
                onClick={closeModal}
                className={style.modalCancelButton}
              >
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
