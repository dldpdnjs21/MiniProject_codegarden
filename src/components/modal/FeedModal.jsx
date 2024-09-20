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
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = dbRef(db, 'users/' + user.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setNickname(userData.nickname || "Anonymous");
        } else {
          console.log('사용자 데이터가 존재하지 않습니다.');
        }
      }
    });
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && title && language && content) {
      const storageRef = ref(storage, `images/${file.name}`);
      try {

        // 이미지를 Storage에 업로드
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImageURL(url);

        // 제목, 사용 언어, 피드 내용, 이미지 URL, 닉네임을 Database에 저장
        const feedRef = dbRef(db, `feeds/${Date.now()}`);
        const createdAt = new Date().toISOString();
        await set(feedRef, {
          title: title,
          language: language,
          content: content,
          imageUrl: url,
          createdAt: createdAt,
          nickname: nickname,
        });

        setTitle("");
        setLanguage("");
        setContent("");
        setFile(null);
        setFileName("");
        closeModal();
      } catch (error) {
        console.error("파일 업로드 또는 데이터베이스 저장 실패:", error);
      }
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
          <div>
            <select
              className={style.modalSelect}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="" disabled>
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
              <button
                type="submit"
                className={style.modalSubmitButton}
              >
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