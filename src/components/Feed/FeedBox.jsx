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
import searchicon from "../img/searchicon.svg";
import FeedModal from "../modal/FeedModal";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";
import { useNavigate } from "react-router-dom";

const FeedBox = () => {
  // 피드 작성 모달 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 피드 검색
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFeeds, setFilteredFeeds] = useState([]); // 필터링된 피드
  const [notice, setNotice] = useState("리뷰할 코드가 없습니다."); // 안내문

  const [feeds, setFeeds] = useState([]);
  const [authorInfo, setAuthorInfo] = useState({}); // 피드 작성자 정보

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
        setFilteredFeeds(feedsArray); // 처음에는 전체 피드를 표시
      }
    };

    fetchFeeds();

    // 현재유저 가져오기
    // const fetchUser = async () => {
    //   const user = auth.currentUser;

    //   if (!user) return;

    //   const userRef = dbRef(db, `users/${user.uid}`);
    //   const userSnapshot = await get(userRef);
    //   const userData = userSnapshot.val();
    //   setCurrentUser(userData);
    //   console.log(userData);
    //   if (!userData) return;
    // };

    // fetchUser();
  }, []);

  // 피드 필터링 함수 (검색어를 기준으로)
  const filterFeeds = () => {
    const query = searchQuery.toLowerCase().trim();
    setSearchQuery(query);
    const filtered = feeds.filter(([feedId, feed]) => {
      // 검색 조건 : 피드 제목, 사용언어, 작성자 닉네임, 작성자 개발분야
      return (
        feed.title.toLowerCase().includes(query) ||
        feed.language.toLowerCase().includes(query) ||
        authorInfo[feed.authorUid].nickname.toLowerCase().includes(query) ||
        authorInfo[feed.authorUid].developmentField
          .toLowerCase()
          .includes(query)
      );
    });
    if (filtered.length === 0) {
      setNotice("검색 결과가 없습니다.");
    }
    setFilteredFeeds(filtered); // 필터링된 결과를 저장
  };

  // 검색창에서 엔터를 눌렀을 때 필터링 수행
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      // if (searchQuery.length < 2) {
      //   setNotice("검색어를 두 글자 이상 입력해주세요.");
      // } else filterFeeds(); // 엔터를 눌렀을 때 필터링 실행
      filterFeeds(); // 엔터를 눌렀을 때 필터링 실행
    }
  };

  // 피드 댓글 가져오기
  useEffect(() => {
    if (feeds.length) {
      feeds.forEach(([feedId]) => {
        fetchComments(feedId);
      });
    }
  }, [feeds]);

  // const { userInfo, fetchUserInfo } = useUser();

  // 피드 작성자 정보 가져오기
  const fetchAuthorInfo = async (uid) => {
    const userRef = dbRef(db, `users/${uid}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    setAuthorInfo((prev) => ({ ...prev, [uid]: userData })); // UID를 키로 저장
  };

  useEffect(() => {
    if (feeds.length) {
      feeds.forEach((feed) => {
        fetchAuthorInfo(feed[1].authorUid);
      });
    }
  }, [feeds]);

  const handleQueryChange = (e) => {
    const query = e.target.value;
    if (query.trim() === "") {
      setFilteredFeeds(feeds);
    }
    setSearchQuery(query);
  };

  const navigate = useNavigate();

  const handleClickUser = (uid) => {
    setSearchQuery("");
    // profile 페이지로 이동하면서 param값으로 해당 유저 uid 보내기
    navigate("/profile", { state: { userId: uid } });
    closeModal();
  };
  return (
    <div style={{ marginBottom: "40px" }}>
      <div className={style.headContainer}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className={style.searchInput}
          value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
          onChange={handleQueryChange} // 검색어 상태 업데이트
          onKeyDown={handleSearchKeyDown} // 엔터 키를 눌렀을 때 필터링
          disabled={feeds.length > 0 ? false : true} // 피드가 없으면 disabled
        />
        <img className={style.searchicon} src={searchicon} alt="검색" />
        <button className={style.addFeedButton} onClick={openModal}>
          피드작성
        </button>

        <FeedModal isOpen={isModalOpen} closeModal={closeModal} />
      </div>
      {filteredFeeds.length > 0 ? (
        filteredFeeds.map(([feedId, feed]) => {
          const author = authorInfo[feed.authorUid];
          // if (!author) {
          //   console.error("해당 index에 맞는 author가 존재하지 않습니다.");
          // }
          if (author) {
            console.log(author);
            return (
              <div key={feedId} className={style.feedContainer}>
                <div
                  className={style.feedUser}
                  onClick={() => handleClickUser(feed.authorUid)}
                >
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
                    <LanguageBadge language={feed.language} />
                  </div>
                  <p className={style.title}>{feed.title}</p>
                  <div className={style.markdown}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                      {feed.content}
                    </ReactMarkdown>
                  </div>
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
                      onSubmit={(e) =>
                        handleCommentSubmit(
                          e,
                          feedId,
                          feed.authorUid,
                          feed.title
                        )
                      }
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
                            onClick={() => handleClickUser(comment.userId)}
                          />
                          <div>
                            <p
                              className={style.commentWriter}
                              onClick={() => handleClickUser(comment.userId)}
                            >
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
          <p>{notice}</p>
        </div>
      )}
    </div>
  );
};

export default FeedBox;
