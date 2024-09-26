import React, { useState, useEffect } from "react";
import { ref as dbRef, get } from "firebase/database";
import { auth, db } from "../../pages/firebase/firebase";
import style from "../css/FeedBox.module.css";
import { useComments } from "./Comments";
import default_profile from "../img/default_profile.svg";
import useUser from "../../hooks/ useUser";
import emptyImg from "../img/emptyImg.svg";
import paper_plane from "../img/paper_plane.svg";
import LanguageBadge from "../LanguageBadge";

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

  const [currentUser, setCurrentUser] = useState({});

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

    // 현재유저 가져오기
    const fetchUser = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const userRef = dbRef(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();
      setCurrentUser(userData);
      console.log(userData);
      if (!userData) return;
    };

    fetchUser();
  }, []);

  useEffect(() => {
    feeds.forEach(([feedId]) => {
      fetchComments(feedId);
    });
  }, [feeds]);

  const { userInfo, fetchUserInfo } = useUser(); // 피드 작성자 정보 가져오기

  useEffect(() => {
    if (feeds.length) {
      feeds.forEach((element) => {
        fetchUserInfo(element[1].authorUid);
      });
    }
  }, [feeds]);

  return (
    <div style={{ marginBottom: "20px" }}>
      {feeds.length > 0 ? (
        feeds.map(([feedId, feed], index) => {
          let author = userInfo[index];
          // if (!author) {
          //   console.error("해당 index에 맞는 author가 존재하지 않습니다.");
          // }
          if (author) {
            console.log(author);
            return (
              <div key={feedId} className={style.feedContainer}>
                <div className={style.feedUser}>
                  <img
                    src={author.profileImg || default_profile}
                    className={style.authorImg}
                  />
                  <div>
                    <div className={style.nickname}>
                      {author.nickname || "닉네임 없음"}
                    </div>
                    <div className={style.field}>
                      {author.developmentField || ""}
                    </div>
                  </div>
                </div>
                <div className={style.contentsWrap}>
                  <div className={style.contentsHead}>
                    <p className={style.feedDate}>
                      {/* 등록 시간 */}
                      {new Date(feed.createdAt)
                        .toLocaleDateString("ko-KR")
                        .slice(0, -1)}
                    </p>
                    {/* 사용 언어*/}
                    {/* <p className={style.language}>
                      {feed.language}
                    </p> */}
                    <LanguageBadge language={feed.language} />
                  </div>
                  <p className={style.title}>{feed.title}</p>

                  <p className={style.content}>{feed.content}</p>
                  {feed.imageUrl && (
                    <img
                      src={feed.imageUrl}
                      alt="피드 이미지"
                      className={style.feedImage}
                    />
                  )}
                </div>
                <div className={style.commentWrap}>
                  <div className={style.commentHead}>
                    리뷰
                    <span className={style.commentCnt}>
                      {comments[feedId] && comments[feedId].length}
                    </span>
                  </div>
                  <div className={style.commentWrite}>
                    <form
                      className={style.commentForm}
                      onSubmit={(e) => handleCommentSubmit(e, feedId)}
                    >
                      <input
                        type="text"
                        placeholder="리뷰를 작성해 주세요."
                        value={newComment[feedId] || ""}
                        onChange={(e) => handleCommentChange(e, feedId)}
                        className={style.commentInput}
                      />
                      <button type="submit" className={style.commentButton}>
                        <img src={paper_plane} />
                      </button>
                    </form>
                  </div>
                  <div className={style.commentList}>
                    {comments[feedId] &&
                      comments[feedId].map(([commentId, comment]) => (
                        <div key={commentId} className={style.comment}>
                          <img
                            src={comment?.profileImg || default_profile}
                            alt="리뷰작성자"
                            className={style.commentProfile}
                          />
                          <div>
                            <p className={style.commentWriter}>
                              {comment.nickname || "닉네임 없음"}
                            </p>

                            <p className={style.commentDate}>
                              {new Date(comment.createdAt)
                                .toLocaleDateString("ko-KR")
                                .slice(0, -1)}
                            </p>
                            <p className={style.commentText}>{comment.text}</p>
                          </div>
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
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className={style.emptyFeed}>
          <img src={emptyImg} className={style.emptyImg} />
          <p>리뷰할 코드가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default FeedBox;
