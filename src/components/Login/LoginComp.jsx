import { Link, useNavigate } from "react-router-dom";
import { TextBox, FormField, Button } from "../Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../rtk-slice/globalSlice";
import { doLogin } from "../../rtk-slice/globalSlice";
import "./LoginComp.scss";
import logoImage from "../../images/swift-transport-logo.png";
import * as Navigation from "../../constants/routes"

const LoginComponent = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector(getUserData);
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  useEffect(() => {
    if (userData && userData.success) {
      Navigate(Navigation.HOME);
    } else if (userData && !userData.success) {
      setShowErrorMsg(true)
    }
  }, [userData])

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User name is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const onSubmitFunction = (formData) => {
    setShowErrorMsg(false)
    const authUser = async () => {
      const username = formData.username
      const password = btoa(formData.password)
      dispatch(doLogin({username,password}))
    };
    authUser();
  };

  return (
    <div className="login-wrapper">
      <div className="login-page container-fluid">
        <div className="login-container backdrop-blur container-fluid">
          <div className="row center-items">
            <div className="col-md-12 text-center ">
              <div className="logo-wpr h-25">
                <img src={logoImage} alt="logo" className="logo-img" />
              </div>
              <div className="login-page-logo text-center w-100">
                <h3 className=" text-white fs-3">Track Mile - Admin</h3>
              </div>
            </div>

            <div className="col-md-12 text-center">
              <form
                autoComplete="none"
                onSubmit={handleSubmit(onSubmitFunction)}
              >
                <div className="input mb-1">
                  <FormField
                    title="Username"
                    id="username"
                    ratio={[2, 12]}
                    className="text-white"
                  >
                    <TextBox
                      register={register}
                      id="username"
                      errors={errors}
                      placeholder="User Name"
                      maxLength="30"
                      type="text"
                      icon="true"
                    />
                  </FormField>
                </div>

                <div className="input">
                  <FormField
                    title="Password"
                    id="password"
                    ratio={[2, 12]}
                    className="text-white"
                  >
                    <TextBox
                      register={register}
                      id="password"
                      errors={errors}
                      placeholder="Password"
                      maxLength="30"
                      type="password"
                      icon="true"
                    />
                  </FormField>
                </div>
                <div className="col-md-12">
                  {showErrorMsg && (
                <p className="text-danger">Please check your credentials</p>
              )}
                </div>

                <div className="col-md-12 text-center mt-2">
                  <div className="d-flex justify-content-end ">
                    <Link to="/resetPassword">
                      <p className="underline-text fs-6">
                        Forgot your password?
                      </p>
                    </Link>
                  </div>
                  <Button
                    color="rgba(0, 43, 85, 1)"
                    className="btn btn-primary login-button"
                    type="submit"
                    title="LOGIN"
                  />
                  <p className="mt-1 text-muted fs-6">
                    Don't you have an account?{" "}
                    <Link to="/register">
                      <span className="underline-text">Sign up</span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
