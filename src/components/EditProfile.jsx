import profileImg from "./img/default_profile.svg";
import style from "./css/EditProfile.module.css";
import { useState } from "react";
import TechStackSelect from "./dropdown/TechStackSelect";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    nickname: "코드가든",
    developmentField: "frontend",
    techStacks: [
      { name: "React", color: "61DAFB" },
      { name: "JavaScript", color: "F7DF1E" },
    ],
    introduce: "가독성 좋은 코드를 작성하고자 노력하는 프론트엔드 개발자입니다",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [checkedList, setCheckedList] = useState(formData.techStacks);
  const handleCheck = (isChecked, item) => {
    let techStackList = formData.techStacks;
    if (isChecked) {
      techStackList = [...techStackList, item];
      console.log(techStackList);
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

  const [stackBoxOpen, setStackBoxOpen] = useState(false);

  return (
    <div className={style.container}>
      <img src={profileImg} className={style.profileImg} />
      <div className={style.form}>
        <div className={style.inputs}>
          <div className={style.inputArea}>
            <div className={style.label}>닉네임</div>
            <input
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              className={style.inputBox}
            />
          </div>
          <div className={style.inputArea}>
            <div className={style.label}>개발분야</div>
            <div className={style.selectBox}>
              <select
                name="developmentField"
                //   value={formData.developmentField}
                onChange={handleChange}
                defaultValue={formData.developmentField}
                className={style.textarea}
                required
              >
                <option value="">개발 분야</option>
                <option value="frontend">프론트엔드</option>
                <option value="backend">백엔드</option>
                <option value="fullstack">풀스택</option>
              </select>
            </div>
          </div>
          <div className={style.inputArea}>
            <div className={style.label}>기술스택</div>
            <div
              className={style.addStack}
              onClick={() => {
                setStackBoxOpen((prev) => !prev);
              }}
            >
              기술스택 추가
            </div>
            {stackBoxOpen && (
              <TechStackSelect
                handleCheck={handleCheck}
                checkedList={checkedList}
              />
            )}
          </div>
          <div className={style.inputArea}>
            <div className={style.label}>내 소개</div>
            <textarea
              value={formData.introduce}
              onChange={handleChange}
              className={style.textBox}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
