const LanguageBadge = (props) => {
  const languages = {
    JavaScript: "#F7DF1ECC", // JavaScript
    Python: "#3776ABCC", // Python
    Java: "#007396CC", // Java
    "C#": "#239120CC", // C#
    PHP: "#777BB4CC", // PHP
    "C++": "#00599CCC", // C++
    TypeScript: "#3178C6CC", // TypeScript
    SQL: "#CC2927CC", // SQL (Azure SQL Database Color)
    Ruby: "#CC342DCC", // Ruby
    Swift: "#FA7343CC", // Swift
    Go: "#00ADD8CC", // Go
    Kotlin: "#0095D5CC", // Kotlin
    Rust: "#000000CC", // Rust
    Dart: "#0175C2CC", // Dart
    R: "#276DC3CC", // R
  };

  const language = props.language;
  const color = languages[language];

  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: "5px",
        padding: "3px 8px",
        fontSize: "10px",
      }}
    >
      <p>{language}</p>
    </div>
  );
  // return props.name === "C++" ? (
  //   <img
  //     src={`https://img.shields.io/badge/-C++-00599C?logo=c%2B%2B&style=for-the-badge`}
  //     style={{ borderRadius: "5px", height: "20px" }}
  //   />
  // ) : (
  //   <img
  //     src={`https://img.shields.io/badge/${props.name}-${props.color}?style=for-the-badge&logo=${props.name}&logoColor=white`}
  //     style={{ borderRadius: "5px", height: "20px" }}
  //   />
  // );
};

export default LanguageBadge;
