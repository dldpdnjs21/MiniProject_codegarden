import React, { useState, useEffect } from "react";
import { useFeed } from "./Feed";
import { useComments } from "./Comments";
import style from "./css/FeedBox.module.css";

const FeedBox = () => {
  const { feeds, fetchFeeds } = useFeed();
  const { comments, fetchComments, handleCommentSubmit, handleCommentChange, handleCommentDelete, newComment } = useComments();

  useEffect(() => {
    fetchFeeds();
  }, []);

  useEffect(() => {
    feeds.forEach(([feedId]) => {
      fetchComments(feedId);
    });
  }, [feeds]);

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

          {/* 댓글 표시 */}
          <div className={style.commentList}>
            {comments[feedId] &&
              comments[feedId].map(([commentId, comment]) => (
                <div key={commentId} className={style.comment}>
                  <p>
                    <strong>{comment.nickname || "닉네임 없음"}</strong>: {comment.text}
                  </p>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  <button onClick={() => handleCommentDelete(feedId, commentId)}>삭제</button>
                </div>
              ))}
          </div>

          {/* 댓글 입력 */}
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
      ))}
    </div>
  );
};

export default FeedBox;