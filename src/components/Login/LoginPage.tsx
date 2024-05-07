// @ts-nocheck
import React, { useState, useEffect } from "react";
// import image005 from '../../../icons/image005.png';
import { post } from "../../services/DataService";
// import Loader from '../MainWindow/Loader';
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login } from "../App/Config";
import { decrypt, encrypt } from "../../services/EncryptDecrypt";
import { defaultPingInterval, defaultMaxFileSize } from "../App/Config";
// import { useInterval } from '../PingAPI';
import { passwordRegex, emailRegex } from "../Constant/Constants";
import { userLogout } from "../../utils/globalUtility";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({ username: "", password: "" });
  const [apiError, setApiError] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [saveToken, setSaveToken] = useState<string>("");

  let navigate = useNavigate();
  const dispatch: any = useDispatch();
  const isLoggedIn = useSelector(
    (state: any) => state.UserInfoReducer && state.UserInfoReducer.isLoggedin
  );
  const loggedinError = useSelector(
    (state: any) => state.UserInfoReducer && state.UserInfoReducer.loggedinError
  );

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    let errors = { username: "", password: "" };
    const passwordRegex = /(?=.*[0-9])/;
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!username) {
      isValid = false;
      errors.username = "Email address is required";
    } else if (!emailRegex.test(username)) {
      errors.username = "Please enter a valid email address";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be 8 characters long.";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Invalid password. Must contain one number.";
    }

    return { isValid, errors };
  };

  const findErrorById = (errorArray: any, field: any) => {
    const filterError = errorArray.find((error: any) => error.field === field);
    return filterError ? filterError.details : "";
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setApiError("");
    setSaveToken("");

    const { isValid, errors } = validateForm();
    if (!isValid) {
      setErrors({ ...errors });
      return;
    }

    setErrors({ ...errors });

    const defaultErrorMsg = "Something went wrong! Please try again.";

    // const payload: any = {
    //   mail: username,
    //   password: password,
    // };
    setShowLoader(true);
    //console.log("check before dispatch payload", payload);
    // dispatch(actions.userLogin(payload));
    // const response = await post(login, payload);
    //if ((response && response.status === 200) || True) {
     // const data = response.data;
     // if ( True) {
        const userInfo = {
          userId: Math.floor(Math.random() * 9000) + 1000,
          fullName: username,
          // userType: data.userType,
          // pingInterval: data.login_reset_timeout ? data.login_reset_timeout : defaultPingInterval,
          // maxFileSize: data.max_file_size ? data.max_file_size : defaultMaxFileSize,
          // photoUrl: data.photo_url
        };
        // sessionStorage.setItem("accessToken", data.access_token);
        // sessionStorage.setItem("refreshToken", data.refresh_token);
        // sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("userInfo", JSON.stringify(encrypt(userInfo)));
        // if (sessionStorage.getItem('userInfo')) {
        //   if (data.userType === 'admin') {
        //     history.push('/adminDashboard');
        //   } else {
        //     history.push('/dashboard');
        //   }
        // }
        navigate("/dashboard");
      //} 
      // else {
      //   setApiError(defaultErrorMsg);
      // }
    //} 
    // else {
    //   if (
    //     response &&
    //     response.data &&
    //     response.data.field_errors &&
    //     response.data.field_errors.length > 0
    //   ) {
    //     const fields = response.data.field_errors;
    //     if (
    //       response.status === 400 &&
    //       response.data.field_errors[1].field === "access_token"
    //     ) {
    //       setApiError(findErrorById(fields, "details"));
    //       sessionStorage.setItem(
    //         "accessToken",
    //         response.data.field_errors[1].details
    //       );
    //       setSaveToken(response.data.field_errors[1].details);
    //     } else {
    //       setErrors({ username: findErrorById(fields, "mail"), password: "" });
    //     }
    //   } else if (response && response.data && response.data.details) {
    //     setApiError(response.data.details);
    //   } else {
    //     setApiError(defaultErrorMsg);
    //   }
    // }
    setShowLoader(false);
  };

  /* this methods will excute when login getting success */
  useEffect(() => {
    if (sessionStorage.getItem("userInfo")) {
      navigate("/dashboard");
      setShowLoader(false);
    } 
  }, [isLoggedIn]);
  console.log("check loggedIn", isLoggedIn);
  return (
    <form
      id="login"
      name="login"
      className="card-container card-container-login"
    >
      {/* {showLoader && <Loader type={'simple'} />} */}
      {/* <img src={image005} className='logo-style' alt='logo' /> */}
      <p className="logo-label">
        Task Manager<sup className="login-logo-sup">1</sup>
      </p>

      <div className="form-container">
        <div className="header-title">
          <h3 className="login-title">LOGIN</h3>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Please Enter Email"
            required
            className="form-control"
            onChange={(ev) => setUsername(ev.target.value)}
            value={username}
          />
          {errors.username && <p className="errorMessage">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Please Enter Password"
              required
              className="form-control outline-none"
              onChange={(ev: any) => setPassword(ev.target.value)}
              value={password}
            />
            <button
              type="button"
              className="btn btn-outline-secondary outline-none"
              style={{ outline: "none" }}
              onClick={handlePasswordToggle}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          {errors.password && <p className="errorMessage">{errors.password}</p>}
        </div>
        <span style={{ color: "red", paddingBottom:"5px" }}>{loggedinError}</span>
        <div className="nav-links">
          <a className="link-style" onClick={() => navigate("/forgotPassword")}>
            Forgot Password?
          </a>
          <div>
            <span>Not have an account? </span>
            <a className="link-style" onClick={() => navigate("/signup")}>
              Sign up
            </a>
          </div>
        </div>

        <p className="errorMessage">
          {apiError}
          {saveToken && (
            <a className="logout-style" onClick={() => userLogout(true)}>
              Logout
            </a>
          )}
        </p>

        <button className="btn btn-primary login-button" onClick={onSubmit}>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
