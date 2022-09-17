import React from "react";
const FormField = ({ title, id, children, ratio, required, className }) => {
  if (title) {
    const ratioOfFields = ratio ? ratio : [4, 8];
    return (
      <div className="row mb-3">
        <label
          htmlFor={id}
          className={`col-sm-${ratioOfFields[0]} col-form-label ${className}`}
        >
          {title}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
        <div className={`col-sm-${ratioOfFields[1]} `}>{children}</div>
      </div>
    );
  } else {
    return <div className="row mb-3">{children}</div>;
  }
};
export default FormField;
