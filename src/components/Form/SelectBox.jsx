import React from "react";
import Form from "react-bootstrap/Form";

const SelectBox = (props) => {
  const {
    register,
    id,
    errors,
    disabled,
    data,
    displayKey,
    valueKey,
    onChange,
    value,
    setValue,
    defaultLabel,
    className
  } = props;
  const onChangeFunc = (e) => {
    onChange && onChange(e)
    setValue(id, e.target.value, { shouldValidate: true })
  }
  return (
    <>
    <Form.Select
      aria-label="Default select example"
      className={`form-select ${errors[id] ? "is-invalid" : ""} ${className}`}
      id={id}
      {...register(id)}
      defaultValue={value}
      disabled={disabled}
      onChange={(e) => onChangeFunc(e)}
    >
      <option style={{color: "green"}}  value="">{defaultLabel}</option>
      {Array.isArray(data) ?
        data.map((option, index) => (
          <option key={index} value={option[valueKey]}>{option[displayKey]}</option>
        )):console.log("error:Pass an array for a SelectBox data")
      }
    </Form.Select>
    {errors && errors[id] && (
      <p className="invalid-feedback"> {errors[id].message}</p>
    )}
    </>
  );
};
export default SelectBox;
