import React from 'react';
import './css/MainPage.css';

const MainPage = () => {
  return (
    <div className="main-container">
      <header className="header">
        <img src="logo.png" alt="Logo" className="logo" />
        <nav className="nav-bar">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </header>

      <div className="main-content">
        <aside className="profile">
          <div className="profile-card">
            <div className="profile-pic"></div>
            <h2>코드가든</h2>
            <p>프론트엔드 개발자</p>
            <button className="my-page-button">My Page</button>
            <button className="logout-button">Log out</button>
          </div>

          <div className="chatting-rooms">
            <h3>채팅방</h3>
            <div className="chat-list">
              <div className="chat-item">
                <div className="chat-pic"></div>
                <p>코드가든: 안녕하세요...</p>
              </div>
              <div className="chat-item">
                <div className="chat-pic"></div>
                <p>먹짱김: 먹짱으로서 피드백...</p>
              </div>
              <div className="chat-item">
                <div className="chat-pic"></div>
                <p>이애웅: 그거 그렇게 짜면...</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="feed">
          <div className="feed-post">
            <div className="post-header">
              <p>작성자</p>
              <span>작성 날짜</span>
            </div>
            <div className="post-content">
              <p>제목</p>
              <img src="code_image.png" alt="코드 파일 첨부" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;