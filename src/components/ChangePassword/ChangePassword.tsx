import { useState, useEffect } from "react";
import { post } from "../../services/DataService";
import { changePassword } from "../App/Config";
// import Loader from '../MainWindow/Loader';
import "./ChangePassword.css";
import { passwordRegex } from "../Constant/Constants";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";
import { getUserInfo } from "components/Constant/ConstantFunction";
import { useNavigate } from "react-router-dom";
interface ErrorObj {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePassword = () => {
  const dispatch: any = useDispatch();
  const userInfo = getUserInfo();
  let navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState<any>("");
  const [showErrorAlert, setShowErrorAlert] = useState<any>("");
  const [showLoader, setShowLoader] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const isChangedPassed = useSelector(
    (state: any) =>
      state.UserInfoReducer && state.UserInfoReducer.isChangedPassword
  );

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleNewPasswordToggle = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let errorObj: ErrorObj = {};

    if (!currentPassword) {
      errorObj.currentPassword = "Current password is required";
    } else if (currentPassword.length < 8) {
      errorObj.currentPassword = "Password must have at least 8 characters";
    } else if (!passwordRegex.test(currentPassword)) {
      errorObj.currentPassword =
        "Password must include uppercase letter, lowercase letter, number, and symbols";
    }
    if (!newPassword) {
      errorObj.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      errorObj.newPassword = "Password must have at least 8 characters";
    } else if (!passwordRegex.test(newPassword)) {
      errorObj.newPassword =
        "Password must include uppercase letter, lowercase letter, number, and symbols";
    }

    if (!confirmPassword) {
      errorObj.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== confirmPassword) {
      errorObj.confirmPassword = "Passwords do not match";
    }

    return errorObj;
  };

  const handleResetPassword = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setApiError("");
    setApiSuccess("");
    setShowLoader(true);
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const payload: any = {
        userId: userInfo?.id,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      dispatch(actions.changePasswordActions(payload));
      // const url = changePassword;
      // const response = await post(url, JSON.stringify(payload));
      setShowLoader(false);
      // if (response.status === 200 || response.status === 204) {
      //   setApiSuccess("Your password is successfully Updated");
      // } else if (response.status === 404 || response.status === 409) {
      //   setApiError(response?.data?.details);
      // } else if (response.status === 400) {
      //   if (response && response.data && response.data.details) {
      //     setApiError(response?.data?.details);
      //   } else {
      //     setApiError("Unable to update new password");
      //   }
      // } else {
      //   setApiError('Something went wrong! please try again.');
      // }
    } else {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    if (isChangedPassed) {
      navigate("/login");
    }
  }, [isChangedPassed]);

  //   const renderMessageBar = (msgType: any, msgText: any) => {
  //     return (
  //       <MessageBar
  //         delayedRender={false}
  //         messageBarType={msgType}
  //         onDismiss={() => {
  //           setShowErrorAlert('');
  //           setShowSuccessAlert('')
  //         }}
  //       >{msgText}</MessageBar>
  //     )
  //   }

  return (
    <>
      <form
        id="change-password"
        name="change-password"
        className="card-container card-container-login"
      >
        {/* {showLoader && <Loader type={'simple'} />}
        {showErrorAlert && renderMessageBar(MessageBarType.error, showErrorAlert)}
        {showSuccessAlert && renderMessageBar(MessageBarType.success, showSuccessAlert)} */}
        <p className="logo-label">
          Task Manager<sup className="login-logo-sup">1</sup>
        </p>
        <div className="form-container">
          <div className="header-title">
            <h3 className="login-title">CHANGE PASSWORD</h3>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Please Enter Password"
                required
                className="form-control outline-none"
                onChange={(ev: any) => setCurrentPassword(ev.target.value)}
                value={currentPassword}
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
            {errors.currentPassword && (
              <p className="errorMessage">{errors.currentPassword}</p>
            )}
          </div>
          <div className="form-group">
            <label>New Password</label>
            <div className="input-group">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Please Enter Password"
                required
                className="form-control outline-none"
                onChange={(ev: any) => setNewPassword(ev.target.value)}
                value={newPassword}
              />
              <button
                type="button"
                className="btn btn-outline-secondary outline-none"
                style={{ outline: "none" }}
                onClick={handleNewPasswordToggle}
              >
                {showNewPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="errorMessage">{errors.newPassword}</p>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Please Enter Confirm Password"
                required
                className="form-control outline-none"
                onChange={(ev: any) => setConfirmPassword(ev.target.value)}
                value={confirmPassword}
              />
              <button
                type="button"
                className="btn btn-outline-secondary outline-none"
                style={{ outline: "none" }}
                onClick={handleConfirmPasswordToggle}
              >
                {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="errorMessage">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="nav-links">
            <a className="link-style" style={{ fontSize: "14px" }} onClick={() => navigate("/login")}>
              Login
            </a>
          </div>
          {apiError && <p className="errorMessage">{apiError}</p>}
          {apiSuccess && <p className="successMessage">{apiSuccess}</p>}
          {/* <PrimaryButton className='change-button' text='Submit' onClick={handleResetPassword} allowDisabledFocus
          /> */}
          <button
            className="btn btn-primary login-button mt-3"
            onClick={handleResetPassword}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
