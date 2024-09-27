import React, { useState, useEffect } from "react";
import style from "./css/MyFeed.module.css"; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import ReviewRequest from "./modal/ReviewRequest";
import LanguageBadge from "./LanguageBadge";

const MyFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [LoadFeedId, setLoadFeedId] = useState(null);
  const [isReviewRequestOpen, setIsReviewRequestOpen] = useState(false); // 리뷰 모달
  const [selectedFeedId, setSelectedFeedId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const feedsRef = ref(db, `feeds`);

      onValue(feedsRef, (snapshot) => {
        const feedData = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          if (data.authorUid === user.uid) {
            feedData.push({ 
              id: childSnapshot.key, 
              title: data.title, 
              createdAt: data.createdAt,
              content: data.content,
              language: data.language,
              comments: data.comments ? Object.values(data.comments) : []
            });
          }
        });

        feedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeeds(feedData);
      });
    }
  }, []);

  const handleDelete = async (feedId) => {
    const db = getDatabase();
    const feedRef = ref(db, `feeds/${feedId}`);
    await remove(feedRef);
    setFeeds(feeds.filter(feed => feed.id !== feedId));
  };

  const feedLoad = (feedId) => {
    setLoadFeedId(LoadFeedId === feedId ? null : feedId);
  };

  const openReviewRequest = (feedId) => {
    setSelectedFeedId(feedId); 
    setIsReviewRequestOpen(true);
  };

  const closeReviewRequest = () => {
    setIsReviewRequestOpen(false); 
  };

  return (
    <div className={style.container}>
      <ul className={style.feedList}>
        {feeds.length > 0 ? (
          feeds.map((feed) => (
            <li key={feed.id} className={style.feedItem}>
              <div className={style.feedList}>
                <div 
                  className={style.feedTitle} 
                  onClick={() => feedLoad(feed.id)}
                >
                  {feed.title}
                </div>
                <div className={style.feedInfo}>
                  <div className={style.feedDate}>
                    {new Date(feed.createdAt).toLocaleString()}
                  </div>
                  <LanguageBadge language={feed.language} />
                </div>
              </div>

              {LoadFeedId === feed.id && (
                <div className={style.feedDetails}>
                  <div className={style.feedContent}>{feed.content}</div>
                  <div className={style.feedComments}>
                    <hr />
                  <div className={style.feedComment}>

                    <div className={style.reviewCount}>
                    <strong className={style.reviewCountTitle}>리뷰</strong>
                    {feed.comments.length}
                    </div>
                    <div className={style.reviewComments}>
                      {feed.comments.length > 0 ? (
                        <ul>
                          {feed.comments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>댓글이 없습니다.</p>
                      )}
                    </div>
                    </div>
                  </div>
                  <div className={style.feedActions}>
                    <button 
                      onClick={() => handleDelete(feed.id)} 
                      className={style.deleteButton}
                    >
                      삭제
                    </button>
                    <button 
                      onClick={() => openReviewRequest(feed.id)}
                      className={style.reviewButton}
                    >
                      리뷰 요청
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className={style.noFeed}>작성한 피드가 없습니다.</li>
        )}
      </ul>
      {isReviewRequestOpen && (
        <ReviewRequest isOpen={isReviewRequestOpen} closeModal={closeReviewRequest} />
      )}
    </div>
  );
};

export default MyFeed;