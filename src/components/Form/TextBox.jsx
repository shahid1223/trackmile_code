import React from "react";

export const TextBox = (propss) => {  
  const {
    register,
    id,
    errors,
    maxLength,
    disabled,
    type,
    placeholder,
    icon,
    value,
    staticVal,
    setValue,
    className,
    ...props
  } = propss;
  if (staticVal){
    setValue(id, staticVal);
  }

  return (
    <React.Fragment>
          <input
            id={id}
            placeholder={placeholder}
            name={id}
            {...register(id)}
            className={`form-control ${errors[id] ? "is-invalid" : ""} ${icon ? "icon-enabled" : ""} ${className}` }
            type={type ? type : "text"}
            onKeyDown={(evt) => type==="number" && ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
            maxLength={maxLength}
            disabled={disabled}
            defaultValue={value}
            // value={staticVal}
            
            autoComplete="off"
            {...props}
          />
          {errors && errors[id] && (
            <p className="invalid-feedback"> {errors[id].message}</p>
          )}{" "}
    </React.Fragment>
  );
};
export default TextBox;