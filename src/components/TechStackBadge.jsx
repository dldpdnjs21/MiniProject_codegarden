const TechStackBadge = (props) => {
  return (
    <img
      src={`https://img.shields.io/badge/${props.name}-${props.color}?style=for-the-badge&logo=${props.name}&logoColor=white`}
      style={{ borderRadius: "5px", height: "20px" }}
    />
  );
};

export default TechStackBadge;
