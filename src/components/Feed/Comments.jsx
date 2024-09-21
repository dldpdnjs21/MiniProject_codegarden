import { useState } from "react";
import { ref as dbRef, get, push, set, remove } from "firebase/database";
import { auth, db } from "../../pages/firebase/firebase";

export const useComments = () => {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

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

  const handleCommentChange = (e, feedId) => {
    setNewComment({
      ...newComment,
      [feedId]: e.target.value,
    });
  };

  const handleCommentSubmit = async (e, feedId) => {
    e.preventDefault();
    const commentText = newComment[feedId];

    const user = auth.currentUser;

    const userRef = dbRef(db, `users/${user.uid}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();

    if (commentText) {
      const commentsRef = dbRef(db, `feeds/${feedId}/comments`);
      const newCommentRef = push(commentsRef);
      await set(newCommentRef, {
        text: commentText,
        createdAt: new Date().toISOString(),
        nickname: userData.nickname,
        userId: user.uid,
      });

      setNewComment({
        ...newComment,
        [feedId]: "",
      });

      fetchComments(feedId);
    }
  };

  const handleCommentDelete = async (feedId, commentId) => {
    const commentRef = dbRef(db, `feeds/${feedId}/comments/${commentId}`);
    await remove(commentRef);
    fetchComments(feedId);
  };

  return { comments, fetchComments, handleCommentSubmit, handleCommentChange, handleCommentDelete, newComment };
};