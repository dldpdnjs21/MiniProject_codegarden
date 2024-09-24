import React, { useState, useEffect } from "react";
import { ref as dbRef, get, push, set, remove } from "firebase/database";
import { auth, db } from "../../pages/firebase/firebase";
import style from "../css/FeedBox.module.css";
import { useComments } from "./Comments";
import default_profile from "../img/default_profile.svg";

const FeedBox = () => {
  const [feeds, setFeeds] = useState([]);
  const {
    comments,
    fetchComments,
    handleCommentSubmit,
    handleCommentChange,
    handleCommentDelete,
    newComment,
  } = useComments();

  useEffect(() => {
    // 피드 가져오기
    const fetchFeeds = async () => {
      const feedsRef = dbRef(db, "feeds");
      const snapshot = await get(feedsRef);
      if (snapshot.exists()) {
        // console.log(snapshot.val());

        const data = snapshot.toJSON();
        const feedsArray = Object.entries(data);

        feedsArray.reverse(); // 피드 조회 순서 최신순으로
        setFeeds(feedsArray);
      }
    };

    fetchFeeds();
  }, []);

  useEffect(() => {
    feeds.forEach(([feedId]) => {
      fetchComments(feedId);
    });
  }, [feeds]);

  // 댓글 가져오기
  // const fetchComments = async (feedId) => {
  //   const commentsRef = dbRef(db, `feeds/${feedId}/comments`);
  //   const snapshot = await get(commentsRef);
  //   if (snapshot.exists()) {
  //     const data = snapshot.val();
  //     setComments((prevComments) => ({
  //       ...prevComments,
  //       [feedId]: Object.entries(data),
  //     }));
  //   } else {
  //     setComments((prevComments) => ({
  //       ...prevComments,
  //       [feedId]: [],
  //     }));
  //   }
  // };

  // useEffect(() => {
  //   fetchFeeds();
  // }, []);

  // useEffect(() => {
  //   feeds.forEach(([feedId]) => {
  //     fetchComments(feedId);
  //   });
  // }, [feeds]);

  // const handleCommentSubmit = async (e, feedId) => {
  //   e.preventDefault();
  //   const commentText = newComment[feedId];
  //   const user = auth.currentUser;

  //   if (!user) return;

  //   const userRef = dbRef(db, `users/${user.uid}`);
  //   const userSnapshot = await get(userRef);
  //   const userData = userSnapshot.val();
  //   if (!userData) return;

  //   if (commentText) {
  //     const commentsRef = dbRef(db, `feeds/${feedId}/comments`);
  //     const newCommentRef = push(commentsRef);
  //     await set(newCommentRef, {
  //       text: commentText,
  //       createdAt: new Date().toISOString(),
  //       nickname: userData.nickname,
  //       userId: user.uid,
  //     });

  //     setNewComment((prev) => ({
  //       ...prev,
  //       [feedId]: "",
  //     }));

  //     fetchComments(feedId);
  //   }
  // };

  // const handleCommentDelete = (feedId, commentId) => async () => {
  //   const user = auth.currentUser;
  //   if (!user) return;

  //   const commentRef = dbRef(db, `feeds/${feedId}/comments/${commentId}`);
  //   await remove(commentRef);
  //   fetchComments(feedId);
  // };

  // 피드 작성자 정보 가져오기
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchAuthor(uid) {
      const userRef = dbRef(db, `users/${uid}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        setUserData((data) => [...data, userSnapshot.val()]);
      }
    }

    if (feeds.length) {
      feeds.forEach((element) => {
        fetchAuthor(element[1].authorUid);
      });
    }
  }, [feeds]);

  return (
    <div>
      {userData.length &&
        userData.map((element) => <h2>{element.nickname}</h2>)}

      {/* {feeds.map(([feedId, feed]) => (
        <h2 key={feedId}>Hello</h2>
      ))} */}

      {/* {feeds.map(([feedId, feed]) => {
        // fetchAuthor(feed.authorUid);
        return (
          <div key={feedId} className={style.feedContainer}>
            <div className={style.feedUser}>
              <img
                src={feed.profileImg === "" ? default_profile : feed.profileImg}
                className={style.authorImg}
              />
              <div>
                <div>{feed.nickname || "닉네임 없음"}</div>
                <div>{userData ? userData.nickname : "닉네임 없음"}</div>
              </div>
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
                      <strong>{comment.nickname || "닉네임 없음"}</strong>:{" "}
                      {comment.text}
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
                onChange={(e) => handleCommentChange(e, feedId)}
                className={style.commentInput}
              />
              <button type="submit" className={style.commentButton}>
                댓글 달기
              </button>
            </form>
          </div>
        );
      })} */}
    </div>
  );
};

export default FeedBox;
