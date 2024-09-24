import { ref as dbRef, get, push, set, remove } from "firebase/database";
import { auth, db } from "../pages/firebase/firebase";
import { useState, useEffect } from "react";

const useUser = () => {
  const [userInfo, setUserInfo] = useState([]);
  const fetchUserInfo = async (uid) => {
    const userRef = dbRef(db, `users/${uid}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      let val = userSnapshot.val();
      //   console.log(`Fetched userInfo: ${JSON.stringify(val)}`);
      setUserInfo((prevUserInfo) => [...prevUserInfo, val]);
    }
  };

  // userInfo가 업데이트될 때마다 콘솔에 출력
  //   useEffect(() => {
  //     if (userInfo.length) {
  //       console.log(`Updated userInfo in state: ${JSON.stringify(userInfo)}`);
  //     }
  //   }, [userInfo]);

  return { userInfo, fetchUserInfo };
};

export default useUser;
