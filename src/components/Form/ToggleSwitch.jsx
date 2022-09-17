import React from "react";

const ToggleSwitch = (props) => {
  const {
    register,
    id,
    errors,
    disabled,
    value,
    scale,
  } = props;

  return (
    <React.Fragment>
        <>
          <div className="form-check form-switch h-100 d-flex align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              style={{transform: `scale(${scale})`}}
              disabled={disabled}
              defaultValue={value}
              {...register(id)}
              id={id}
            />
          </div>
          {errors && errors[id] && (
            <p className="invalid-feedback"> {errors[id].message}</p>
          )}{" "}
        </>
      
    </React.Fragment>
  );
};

export default ToggleSwitch;
