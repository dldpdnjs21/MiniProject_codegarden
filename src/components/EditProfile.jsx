import profileImg from "./img/default_profile.svg";
import style from "./css/EditProfile.module.css";
import { useState, useEffect } from "react";
import TechStackSelect from "./dropdown/TechStackSelect";
import TechStackBadge from "./TechStackBadge";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    developmentField: "",
    techStacks: [],
    introduce: "",
  });

  const [checkedList, setCheckedList] = useState([]);
  const [stackBoxOpen, setStackBoxOpen] = useState(false);
  const [introduceCnt, setIntroduceCnt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setFormData({
            nickname: userData.nickname,
            developmentField: userData.developmentField || "",
            techStacks: userData.techStacks || [],
            introduce: userData.introduce || "",
          });
          setCheckedList(userData.techStacks || []);
          setIntroduceCnt(userData.introduce ? userData.introduce.length : 0);
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (isChecked, item) => {
    let techStackList = formData.techStacks;
    if (isChecked) {
      techStackList = [...techStackList, item];
      setCheckedList(techStackList);
    } else {
      techStackList = techStackList.filter((t) => t.name !== item.name);
      setCheckedList(techStackList);
    }
    setFormData({
      ...formData,
      techStacks: techStackList,
    });
  };

  const handleIntroduceChange = (e) => {
    setFormData({
      ...formData,
      introduce: e.target.value,
    });
    setIntroduceCnt(e.target.value.length);
  };

  const handleClickEdit = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      update(userRef, {
        developmentField: formData.developmentField,
        techStacks: formData.techStacks,
        introduce: formData.introduce,
      }).then(() => {
        console.log("프로필 수정 완료");
        alert("프로필 수정이 완료되었습니다");
        navigate('/main');
      }).catch(() => {
        console.log("프로필 수정 실패");
      });
    }
  };

  return (
    <div className={style.container}>
      <img src={profileImg} className={style.profileImg} />
      <div className={style.form}>
        <div className={style.inputs}>
          <div className={style.inputArea}>
            <div className={style.label}>닉네임</div>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              className={style.inputBox}
              readOnly
            />
          </div>
          <div className={style.inputArea}>
            <div className={style.label}>개발분야</div>
            <div className={style.selectBox}>
              <select
                name="developmentField"
                onChange={handleChange}
                value={formData.developmentField}
                required
              >
                {/* 원래 데이터 */}
                <option value={formData.developmentField}>
                  {formData.developmentField}
                </option>

                <option value="프론트엔드 개발자">프론트엔드</option>
                <option value="백엔드 개발자">백엔드</option>
                <option value="풀스택 개발자">풀스택</option>
                <option value="웹 개발자">웹</option>
                <option value="모바일 개발자">모바일</option>
                <option value="게임 개발자">게임</option>
                <option value="DB 개발자">DB</option>
                <option value="임베디드SW 개발자">임베디드SW</option>
                <option value="보안 개발자">보안</option>
              </select>
            </div>
          </div>
          <div className={style.inputArea}>
            <div className={style.label}>기술스택</div>
            <div
              className={`${style.addStack} ${
                stackBoxOpen ? style.addStackOpened : ""
              }`}
              onClick={() => {
                setStackBoxOpen((prev) => !prev);
              }}
            >
              기술스택
            </div>
            {stackBoxOpen && (
              <TechStackSelect
                handleCheck={handleCheck}
                checkedList={checkedList}
                wrap={style.wrap}
                checkbox={style.checkbox}
              />
            )}
            {checkedList.length > 0 ? (
              <div className={style.stackList}>
                {checkedList.map((item) => (
                  <TechStackBadge key={item.name} name={item.name} color={item.color} />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={style.inputArea}>
            <div className={style.label}>내 소개</div>
            <textarea
              value={formData.introduce}
              onChange={handleIntroduceChange}
              className={style.textBox}
              maxLength="50"
              name="introduce"
            />
            <div className={style.count}>
              <span>{introduceCnt}</span>
              <span>/50 자</span>
            </div>
          </div>
          <button onClick={handleClickEdit} className={style.editBtn}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;