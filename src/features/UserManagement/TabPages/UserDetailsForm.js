import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEye, FaPen } from "react-icons/fa";

import { FormField, SelectBox, TextBox, ToggleSwitch, Button } from "../../../components/Form";

import { postData, getData } from '../../../utils/api'
import { getUserData } from "../../../rtk-slice/globalSlice";
import { getDriverGroups, getProfiles } from "../../../rtk-slice/userManagement";
import { errorToast, successToast } from "../../../utils/toastFunc";
import config from "../../../constants/config";

const UserDetailsForm = ({ defaultValues, viewEditMode, id, setCreatedUser, setKey, className,}) => {
  const [viewMode, setViewMode] = useState(viewEditMode) //if we want to change viewMode inside comp
  const toggleViewMode = () => setViewMode(prevViewMode => prevViewMode === "edit" ? "view" : "edit")
  
  const { tokenId, userId } = useSelector(getUserData)?.userContext
  const driverGroup = useSelector(getDriverGroups)
  let profileList = useSelector(getProfiles)
  /* This is to convert the profileList to the format that SelectBox component expects. */
  profileList = Array.isArray(profileList) && profileList.map((profile) => ({ label: profile, value: profile }))

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string(),
    emailId: Yup.string().email().required("Email ID is required"),
    username: Yup.string()
      .required("User Name is required")
      .min(5, "More than 5 characters required")
      .matches(/^[a-zA-Z\-]+$/, 'Only Alphanumeric and Underscore allowed'),
    profile: Yup.string().required("Profile is required"),
    driverGroupId: Yup.string()
      .nullable()
      .when("profile", {
        is: "driver",
        then: Yup.string().required("Driver Group is required"),
      }),
    contactNo: Yup.number()
      .typeError("Contact number must be a number")
      .required("Contact Number is required"),
    dateOfBirthStr: Yup.string().required("Date of Birth is required"),
    address: Yup.string().required("Address is required"),
    abn: Yup.string(),
    licenseNo: Yup.string()
      .nullable()
      .when("profile", {
        is: "driver",
        then: Yup.string().required("Licence Number is required"),
      }),
    licenseExpiryDateStr: Yup.string()
      .nullable()
      .when("profile", {
        is: "driver",
        then: Yup.string().required("Licence Expiry Date is required"),
      }),
    licenceType: Yup.string(),
    bfmNo: Yup.string(),
    gst: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: { ...defaultValues },
  });

  const onCreateUser = async (formData) => {
    const saveUserUrl = config.baseUrl + config.saveUser
    const updateUserUrl = id && config.baseUrl + config.updateUser + '/' + id 
    const submitUrl = id ? updateUserUrl : saveUserUrl 
    const data = {
      ...formData,
      
      profilePic: "",
    }
    // delete data.driver_licence_type
    console.log(data)
    const res = await postData(submitUrl, data, { tokenId: tokenId, userId: userId })
    if (res && res.data) {
      if (!viewMode) {
        successToast({ mes: "User successfully created" })
        const { id, password } = res.data
        setCreatedUser({ id, password })
        setKey("password")
        setViewMode("view")
        // reset()
      }
      else {
        successToast({ mes: "User successfully updated" })
      }
    } else {
      errorToast({mes:res?.errorMessage.slice(43)})
    }
  };
  //  console.log(errors)
  return (
    <>
      <div className={` p-3 pt-5 shadow blur-bg rounded ${className}`}>
        {viewMode && !viewEditMode && <button
          title="view"
          className="btn btn-primary p-1 me-1 lh-1"
          onClick={() => toggleViewMode()}
        >
          {viewMode==="edit"?<FaEye size={20} />:<FaPen size={20} />}
        </button>}
        <form
          autoComplete="off"
          className=""
          onSubmit={handleSubmit(onCreateUser)}
        >
          <section className="row mb-2">
            <div className="col-md-6 px-5">
              <FormField title="First Name" required={true} id="firstName">
                <TextBox
                  type="text"
                  id="firstName"
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  placeholder="First Name"
                />
              </FormField>
              <FormField title="Last Name" id="lastName">
                <TextBox
                  type="text"
                  id="lastName"
                  register={register}
                  disabled={viewMode === "view"}

                  errors={errors}
                  placeholder="Last Name"
                />
              </FormField>
              <FormField title="Email" required={true} id="emailId">
                <TextBox
                  type="text"
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  placeholder="Email"
                  id="emailId"
                />
              </FormField>
              <FormField title="User Name" required={true} id="username">
                <TextBox
                  type="text"
                  id="username"
                  register={register}
                  disabled={viewMode === "view" || viewMode === "edit"}//to disable if one of <view> or <edit>
                  errors={errors}
                  placeholder="User Name"
                />
              </FormField>
              <FormField title="Profile" required={true} id="profile">
                <SelectBox
                  register={register}
                  defaultLabel="Please select"
                  data={profileList}
                  disabled={viewMode} //We can also do this because viewMode can be either view or edit, and viewMode is null on createUser.
                  id="profile"
                  errors={errors}
                  setValue={setValue}
                  onChange={(e) => {
                    if (e.target.value !== "DRIVER") {
                      setValue("driverGroupId", null)
                      setValue("licenseNo", null)
                      setValue("licenseExpiryDate", null)
                    }
                  }}
                  displayKey="label"
                  valueKey="value"
                />
              </FormField>
              {getValues("profile") === "DRIVER" && (
                <FormField title="Driver Group" id="driverGroupId">
                  <SelectBox
                    register={register}
                    defaultLabel="Please Select"
                    data={driverGroup}
                    setValue={setValue}
                    disabled={viewMode === "view"}
                    //   clearErrors={clearErrors}
                    id="driverGroupId"
                    errors={errors}
                    displayKey="name"
                    valueKey="id"
                  />
                </FormField>
              )}

              <FormField title="Contact Number" id="contactNo">
                <TextBox
                  type="number"
                  id="contactNo"
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  placeholder="Contact Number"
                />
              </FormField>

              <FormField title="Date of Birth" id="dateOfBirthStr">
                <TextBox
                  type="date"
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  id="dateOfBirthStr"
                  placeholder=""
                  max={new Date().toLocaleDateString("en-ca")}
                />
              </FormField>
            </div>

            <div className="col-md-6 px-5">
              <FormField title="Address" id="address">
                {/* TextBox comp misbehaving with id="address"*/}
                <input
                  id="address"
                  placeholder="Address"
                  name="address"
                  {...register("address")}
                  className={`form-control ${errors["address"] ? "is-invalid" : ""} `}
                  type="text"
                  disabled={viewMode === "view"}
                  // defaultValue={value}
                  autoComplete="off"
                />
                {errors && errors["address"] && (
                  <p className="invalid-feedback"> {errors["address"].message}</p>
                )}{" "}

              </FormField>

              <FormField title="ABN" id="abn">
                <TextBox
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={viewMode === "view"}
                  id="abn"
                  placeholder="ABN"
                />
              </FormField>
              {getValues("profile") === "DRIVER" && (
                <FormField
                  title="Licence Number"
                  required={true}
                  id="licenseNo"
                >
                  <TextBox
                    type="number"
                    register={register}
                    errors={errors}
                    id="licenseNo"
                    placeholder="Licence Number"
                    disabled={viewMode === "view"}
                  />
                </FormField>
              )}
              {getValues("profile") === "DRIVER" && (
                <FormField title="Licence Expiry Date" id="licenseExpiryDateStr">
                  <TextBox
                    type="date"
                    register={register}
                    errors={errors}
                    id="licenseExpiryDateStr"
                    placeholder="Licence Expiry Date"
                    disabled={viewMode === "view"}
                  />
                </FormField>
              )}
              <FormField title="Driver Licence Type" id="licenceType">
                <TextBox
                  type="text"
                  register={register}
                  errors={errors}
                  disabled={viewMode === "view"}
                  id="licenseType"
                  placeholder="Driver Licence Type"
                />
              </FormField>
              <FormField title="BFM" id="bfmNo">
                <TextBox
                  type="number"
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  id="bfmNo"
                  placeholder="BFM Number"
                />
              </FormField>

              <FormField title="GST" id="gst">
                <ToggleSwitch
                  type="text"
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  id="gst"
                  scale={1.2}
                  placeholder="BFM"
                />
              </FormField>
            </div>
          </section>

          <div className="row mb-1 d-flex justify-content-end">
            <div className="col-md-3 px-3 ">

              {viewMode !== "view" && <Button
                title={viewMode === "edit" ? "Save" : "Submit"}
                type="submit"
                color="#000054"
                style={{ width: "150px", height: "50px" }}
              />}
            </div>
          </div>
        </form>
      </div>

    </>
  );
};

export default UserDetailsForm;
