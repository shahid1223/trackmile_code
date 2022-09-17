const Icon = ({ imgPath, alt, className }) => {
  return (
    <img
      src={imgPath}
      alt={alt ? alt : "icon"}
      aria-hidden="true"
      className={className}
    />
  );
};
export default Icon;
