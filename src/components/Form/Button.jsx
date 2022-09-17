import React from "react";
const Button = (propss) => {
  const {
    title,
    onClick = () => {},
    type,
    color,
    className,
    children,
    style,
    ...props
  } = propss;
  return (
    <button
      className={`btn ${className ? className : ""} w-100`}
      onClick={(val) => {
        onClick(val);
      }}
      style={{
        color: "white",
        backgroundColor: color,
        borderColor: color,
        ...style,
      }}
      type={type ? type : "button"}
      {...props}
    >
      {children}
      {title}
    </button>
  );
};

export default Button;
