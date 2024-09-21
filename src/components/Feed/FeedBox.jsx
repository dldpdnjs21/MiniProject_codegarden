import React, { useState, useEffect } from "react";
import { ref as dbRef, get, push, set, remove } from "firebase/database";
import { auth, db } from "../../pages/firebase/firebase";
import style from "../css/FeedBox.module.css";

const FeedBox = () => {
  const [feeds, setFeeds] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  // 피드 가져오기
  const fetchFeeds = async () => {
    const feedsRef = dbRef(db, "feeds");
    const snapshot = await get(feedsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const feedsArray = Object.entries(data);
      setFeeds(feedsArray);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (feedId) => {
    const commentsRef = dbRef(db, `feeds/${feedId}/comments`);
    const snapshot = await get(commentsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setComments((prevComments) => ({
        ...prevComments,
        [feedId]: Object.entries(data),
      }));
    } else {
      setComments((prevComments) => ({
        ...prevComments,
        [feedId]: [],
      }));
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  useEffect(() => {
    feeds.forEach(([feedId]) => {
      fetchComments(feedId);
    });
  }, [feeds]);

  const handleCommentSubmit = async (e, feedId) => {
    e.preventDefault();
    const commentText = newComment[feedId];
    const user = auth.currentUser;

    if (!user) return;

    const userRef = dbRef(db, `users/${user.uid}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    if (!userData) return;

    if (commentText) {
      const commentsRef = dbRef(db, `feeds/${feedId}/comments`);
      const newCommentRef = push(commentsRef);
      await set(newCommentRef, {
        text: commentText,
        createdAt: new Date().toISOString(),
        nickname: userData.nickname,
        userId: user.uid,
      });

      setNewComment((prev) => ({
        ...prev,
        [feedId]: "",
      }));

      fetchComments(feedId);
    }
  };

  const handleCommentDelete = (feedId, commentId) => async () => {
    const user = auth.currentUser;
    if (!user) return;

    const commentRef = dbRef(db, `feeds/${feedId}/comments/${commentId}`);
    await remove(commentRef);
    fetchComments(feedId);
  };

  return (
    <div className={style.feedContainer}>
      {feeds.map(([feedId, feed]) => (
        <div key={feedId} className={style.feed}>
          <div className={style.feedUser}>
            <h2>{feed.nickname || "닉네임 없음"}</h2>
          </div>
          <h2>{feed.title}</h2>
          <p>사용 언어: {feed.language}</p>
          <p>등록 시간: {new Date(feed.createdAt).toLocaleString()}</p>
          <p>{feed.content}</p>
          {feed.imageUrl && (
            <img
              src={feed.imageUrl}
              alt="피드 이미지"
              className={style.feedImage}
            />
          )}

          <div className={style.commentList}>
            {comments[feedId] &&
              comments[feedId].map(([commentId, comment]) => (
                <div key={commentId} className={style.comment}>
                  <p>
                    <strong>{comment.nickname || "닉네임 없음"}</strong>: {comment.text}
                  </p>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  {auth.currentUser?.uid === comment.userId && (
                    <button
                      onClick={handleCommentDelete(feedId, commentId)}
                      className={style.deleteButton}
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
          </div>

          <form
            className={style.commentForm}
            onSubmit={(e) => handleCommentSubmit(e, feedId)}
          >
            <input
              type="text"
              placeholder="댓글을 입력하세요"
              value={newComment[feedId] || ""}
              onChange={(e) => setNewComment((prev) => ({
                ...prev,
                [feedId]: e.target.value,
              }))}
              className={style.commentInput}
            />
            <button type="submit" className={style.commentButton}>
              댓글 달기
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default FeedBox;