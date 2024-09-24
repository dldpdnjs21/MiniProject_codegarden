const TechStackBadge = (props) => {
  return props.name === "C++" ? (
    <img
      src={`https://img.shields.io/badge/-C++-00599C?logo=c%2B%2B&style=for-the-badge`}
      style={{ borderRadius: "5px", height: "20px" }}
    />
  ) : (
    <img
      src={`https://img.shields.io/badge/${props.name}-${props.color}?style=for-the-badge&logo=${props.name}&logoColor=white`}
      style={{ borderRadius: "5px", height: "20px" }}
    />
  );
};

export default TechStackBadge;
