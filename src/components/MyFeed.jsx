import React, { useState, useEffect } from "react";
import style from "./css/MyFeed.module.css"; 
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const MyFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [LoadFeedId, setLoadFeedId] = useState(null);

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
              content: data.content
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

  return (
    <div className={style.container}>
      <ul className={style.feedList}>
        {feeds.length > 0 ? (
          feeds.map((feed) => (
            <li key={feed.id} className={style.feedItem}>
              <div 
                className={style.feedTitle} 
                onClick={() => feedLoad(feed.id)}
              >
                {feed.title}
              </div>
              {LoadFeedId === feed.id && (
                <div className={style.feedDetails}>
                  <div className={style.feedContent}>{feed.content}</div>
                  <div className={style.feedDate}>
                    {new Date(feed.createdAt).toLocaleString()}
                  </div>
                  <button 
                    onClick={() => handleDelete(feed.id)} 
                    className={style.deleteButton}
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className={style.noFeed}>작성한 피드가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default MyFeed;