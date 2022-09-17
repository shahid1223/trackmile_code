import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import * as Yup from "yup";
import { useEffect } from "react";

import { TextBox, Button } from "../../../components/Form";
import { getUserData, getVehicles } from "../../../rtk-slice/globalSlice";
import { postData } from "../../../utils/api"
import { errorToast, successToast } from "../../../utils/toastFunc";

const RatesTab = ({ defaultValues = { rates: [] }, driverId, submitUrl, viewEditMode }) => {
  
  const vehicleList = useSelector(getVehicles);
  const userData = useSelector(getUserData);
  const [viewMode, setViewMode] = useState(viewEditMode)

  // default format for the RatesTab Form is {rates:[{},{}]} 
  // while submitting it's only the list of objects : [{},{}]
  const validationSchema = Yup.object().shape({
    rates: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Value is mendatory"),
        rate: Yup.number()
          .typeError("Enter a Number")
          .required("Value is mendatory"),
        notes: Yup.string(),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {},
  });
  useEffect(() => {
    if (defaultValues && defaultValues.rates && defaultValues.rates.length === 0 && viewEditMode) {
      vehicleList.map((item, index) => {
        const val = 0
        setValue(`rates[${index}].rate`, val)
      })
    }
    else if (defaultValues && defaultValues.rates.length && Array.isArray(vehicleList)) {
      vehicleList.map((item, index) => {
        const rate = defaultValues?.rates?.[index].rate ? defaultValues.rates[index].rate : 0
        const notes = defaultValues?.rates?.[index].notes ? defaultValues.rates[index].notes : ""
        setValue(`rates[${index}].rate`, rate)
        setValue(`rates[${index}].notes`, notes)
      })
    }
  }, [defaultValues])

  /**
   * It takes a name and returns the id of the vehicle with that name
   * @param Name - The name of the vehicle you want to get the ID of.
   * @returns The id of the vehicle with the name that matches the name passed in.
   */
  const getIdByName = (Name) => {
    const found = vehicleList.find(item => item.name === Name);
    return found.id
  }
  const onSubmitFunction = async (formData) => {
    const data = formData.rates.map((item, index) => {
      return {
        ...item,
        vehicleTypeId: getIdByName(item.name)
      }
    })
    submitUrl = submitUrl + `?driverId=${driverId}`
    const { userId, tokenId } = userData.userContext;
    console.log("::::before rates",data)
    let response = await postData(submitUrl, data, { userId, tokenId })

    if (response?.data) {
      // success respose after
      // alert(response.data)
      successToast({mes:"Rates Saved Successfully"})
    } else {
      // else server error handling
      errorToast({mes:"Try Again"})
      // alert("error", response)
    }
  };

  // console.log(errors);

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmitFunction)} className=" blur-bg p-3">
        <div className="col ">
          <div className="form-group d-flex bold-text">
            <div className="col-1 p-2 center-items text-primary ">S.N</div>
            <div className="col-3 p-2 center-items">Vehicle Type</div>
            <div className="col-2 p-2 center-items">Rates</div>
            <div className="col-6 p-2 center-items">Notes</div>
          </div>
          {Array.isArray(vehicleList) && vehicleList.map((item, index) => (
            <div key={index} className="form-group d-flex row">
              <div className="col-1 p-2 center-items text-primary ">
                <div className="d-inline-block">{index + 1}</div>
              </div>

              <div className="col-3 p-2">
                <TextBox
                  id={`rates[${index}].name`}
                  staticVal={item.name}
                  disabled={true}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />
              </div>

              <div className="col-2 p-2">
                <TextBox
                  id={`rates[${index}].rate`}
                  type="number"
                  value={0} //defaultValue
                  disabled={viewMode === "view"}
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-5 p-2">
                <TextBox
                  value={item.note}
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  id={`rates[${index}].notes`}
                />
              </div>

            </div>
          ))}
        </div>

        <div className="row p-4 ">
          <div className="col-10"></div>
          <div className="ml-auto col-2 ">
            {viewMode !== "view" && <Button type="submit" color="#21366F" title={viewMode === "edit" ? "Save" : "Submit"} />}
          </div>
        </div>
      </form>
    </>
  );
};

export default RatesTab;
