import style from "../css/TechStackSelect.module.css";
const TechStackSelect = ({ handleCheck, checkedList }) => {
  const techStackList = [
    { name: "Java", color: "007396" },
    { name: "JavaScript", color: "F7DF1E" },
    { name: "Spring", color: "6DB33F" },
    { name: "HTML5", color: "E34F26" },
    { name: "CSS3", color: "1572B6" },
    { name: "jQuery", color: "0769AD" },
    { name: "MySQL", color: "4479A1" },
    { name: "React", color: "61DAFB" },
    { name: "PHP", color: "777BB4" },
    { name: "Python", color: "3776AB" },
    { name: "Node.js", color: "339933" },
    { name: "C#", color: "239120" },
    { name: "Swift", color: "FA7343" },
    { name: "Kotlin", color: "7F52FF" },
    { name: "GitHub", color: "181717" },
    { name: "Git", color: "F05032" },
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
