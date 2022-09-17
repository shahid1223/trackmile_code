import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {FaEye, FaPen} from "react-icons/fa"
import * as Yup from "yup";

import { successToast, errorToast } from "../../../utils/toastFunc";
import { TextBox, Button, FormField } from "../../../components/Form";
import { getUserData } from "../../../rtk-slice/globalSlice";
import { getUserDetailsById, postData } from "../../../utils/api";
import config from "../../../constants/config";

const PasswordTab = ({ defaultValues, id,viewEditMode, className, setKey }) => {
  const [viewMode, setViewMode] = useState(viewEditMode) //if we want to change viewMode inside comp
  const toggleViewMode = () => setViewMode(prevViewMode => prevViewMode === "edit" ? "view" : "edit")
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("")
  useEffect( () => {
    const getUsername = async () =>{
      const resp =  await getUserDetailsById(id)
      setUsername(resp.data?.["0"].username)
    }
    getUsername()
  }, [id])
  
  const validationSchema = Yup.object().shape({
    id: Yup.string().required("Value is mendatory"),
    username:Yup.string(),
    password: Yup.string()
      .required("Value is mendatory")
      .min(4, "Password is too short - should be 4 chars minimum."),
      
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
    defaultValues: { ...defaultValues },
  });

  const onNewPassword = async (formData) => {
    const { userId, tokenId } = userData.userContext;
    const url = `${config.baseUrl}${config.changePassword}/${formData.id}?password=${formData.password}`;
    let response = await postData(url, {}, { userId, tokenId });
    if (response?.data) {
      successToast({mes:"Password updated successfully"})
      if(!viewEditMode) {  // if creating new User 
        setViewMode("view") ; // to enable view mode after setting password 
        setValue('password', ""); // to clear the password field before moving to another tab
        setKey("rates"); // moving to another tab
      }
    } else if (response?.errorMessage) {
      errorToast({mes:"Error updating password"})
    } else {
      alert(response);
    }
  };
  // console.log(errors);
  return (
    <>
      <div className={` p-5 shadow blur-bg rounded ${className}`}>
        {/* button only visible when viewEditMode is not passed that is on the time of createUser */}
        {/* when viewing or editing through action buttons on UserDisplay component or after creating user, viewEditMode is passed so this button will render */}
      {viewMode && !viewEditMode && <button
          title="view"
          className="btn btn-primary p-1 me-1 lh-1"
          onClick={() => toggleViewMode()}
        >
          {viewMode==="edit"?<FaEye size={20} />:<FaPen size={20} />}
        </button>}

        <form
          autoComplete="off"
          className="p-3"
          onSubmit={handleSubmit(onNewPassword)}
        >
          <section className="row mb-2">
            <div className="col-md-6 px-5">
              <FormField title="ID" required={true} id="id">
                <TextBox
                  type="text"
                  id="id"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  disabled={true}
                  staticVal={id}
                  placeholder=""
                />
              </FormField>
              {username && <FormField title="Username" required={false} id="username">
                <TextBox
                  type="text"
                  id="username"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  disabled={true}
                  staticVal={username}
                  placeholder=""
                />
              </FormField>}
              {viewMode !== "view" && <FormField title="Set Password" id="password">
                <TextBox
                  type="text"
                  id="password"
                  register={register}
                  disabled={viewMode === "view"}
                  errors={errors}
                  placeholder="New Password"
                />
              </FormField>}
            </div>
          </section>
          <div className="row mb-1 d-flex justify-content-end">
            <div className="col-md-3 px-3 ">
              {viewMode !== "view" && <Button
                title={viewMode==="edit"?"Save":"Submit"}
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

export default PasswordTab;
