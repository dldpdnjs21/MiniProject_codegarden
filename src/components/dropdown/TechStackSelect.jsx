import style from "../css/TechStackSelect.module.css";
const TechStackSelect = ({ handleCheck, checkedList }) => {
  const techStackList = [
    { name: "React", color: "61DAFB" },
    { name: "JavaScript", color: "F7DF1E" },
    { name: "Spring", color: "6DB33F" },
    // { name: "React", color: "61DAFB" },
    // { name: "JavaScript", color: "F7DF1E" },
    // { name: "Spring", color: "6DB33F" },
    // { name: "React", color: "61DAFB" },
    // { name: "JavaScript", color: "F7DF1E" },
    // { name: "Spring", color: "6DB33F" },
    // { name: "React", color: "61DAFB" },
    // { name: "JavaScript", color: "F7DF1E" },
  ];
  return (
    <div className={style.wrap}>
      {/* <div>기술스택</div> */}
      {techStackList.map((item) => (
        <div>
          <input
            type="checkbox"
            onChange={(e) => handleCheck(e.target.checked, item)}
            checked={
              checkedList.some((i) => i.name === item.name) ? true : false
            }
          />
          {item.name}
        </div>
      ))}
    </div>
  );
};
export default TechStackSelect;
