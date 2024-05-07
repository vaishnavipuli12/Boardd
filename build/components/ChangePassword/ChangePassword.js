import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
// import Loader from '../MainWindow/Loader';
import "./ChangePassword.css";
import { passwordRegex } from "../Constant/Constants";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";
import { getUserInfo } from "components/Constant/ConstantFunction";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
    const dispatch = useDispatch();
    const userInfo = getUserInfo();
    let navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const isChangedPassed = useSelector((state) => state.UserInfoReducer && state.UserInfoReducer.isChangedPassword);
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
        let errorObj = {};
        if (!currentPassword) {
            errorObj.currentPassword = "Current password is required";
        }
        else if (currentPassword.length < 8) {
            errorObj.currentPassword = "Password must have at least 8 characters";
        }
        else if (!passwordRegex.test(currentPassword)) {
            errorObj.currentPassword =
                "Password must include uppercase letter, lowercase letter, number, and symbols";
        }
        if (!newPassword) {
            errorObj.newPassword = "New password is required";
        }
        else if (newPassword.length < 8) {
            errorObj.newPassword = "Password must have at least 8 characters";
        }
        else if (!passwordRegex.test(newPassword)) {
            errorObj.newPassword =
                "Password must include uppercase letter, lowercase letter, number, and symbols";
        }
        if (!confirmPassword) {
            errorObj.confirmPassword = "Confirm password is required";
        }
        else if (confirmPassword !== confirmPassword) {
            errorObj.confirmPassword = "Passwords do not match";
        }
        return errorObj;
    };
    const handleResetPassword = async (event) => {
        event.preventDefault();
        setApiError("");
        setApiSuccess("");
        setShowLoader(true);
        const errors = validateForm();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const payload = {
                userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id,
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
        }
        else {
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
    return (_jsx(_Fragment, { children: _jsxs("form", { id: "change-password", name: "change-password", className: "card-container card-container-login", children: [_jsxs("p", { className: "logo-label", children: ["Task Manager", _jsx("sup", { className: "login-logo-sup", children: "1" })] }), _jsxs("div", { className: "form-container", children: [_jsx("div", { className: "header-title", children: _jsx("h3", { className: "login-title", children: "CHANGE PASSWORD" }) }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Password" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: showPassword ? "text" : "password", placeholder: "Please Enter Password", required: true, className: "form-control outline-none", onChange: (ev) => setCurrentPassword(ev.target.value), value: currentPassword }), _jsx("button", { type: "button", className: "btn btn-outline-secondary outline-none", style: { outline: "none" }, onClick: handlePasswordToggle, children: showPassword ? _jsx(BsEyeSlash, {}) : _jsx(BsEye, {}) })] }), errors.currentPassword && (_jsx("p", { className: "errorMessage", children: errors.currentPassword }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "New Password" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: showNewPassword ? "text" : "password", placeholder: "Please Enter Password", required: true, className: "form-control outline-none", onChange: (ev) => setNewPassword(ev.target.value), value: newPassword }), _jsx("button", { type: "button", className: "btn btn-outline-secondary outline-none", style: { outline: "none" }, onClick: handleNewPasswordToggle, children: showNewPassword ? _jsx(BsEyeSlash, {}) : _jsx(BsEye, {}) })] }), errors.newPassword && (_jsx("p", { className: "errorMessage", children: errors.newPassword }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Confirm Password" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: showConfirmPassword ? "text" : "password", placeholder: "Please Enter Confirm Password", required: true, className: "form-control outline-none", onChange: (ev) => setConfirmPassword(ev.target.value), value: confirmPassword }), _jsx("button", { type: "button", className: "btn btn-outline-secondary outline-none", style: { outline: "none" }, onClick: handleConfirmPasswordToggle, children: showConfirmPassword ? _jsx(BsEyeSlash, {}) : _jsx(BsEye, {}) })] }), errors.confirmPassword && (_jsx("p", { className: "errorMessage", children: errors.confirmPassword }))] }), _jsx("div", { className: "nav-links", children: _jsx("a", { className: "link-style", style: { fontSize: "14px" }, onClick: () => navigate("/login"), children: "Login" }) }), apiError && _jsx("p", { className: "errorMessage", children: apiError }), apiSuccess && _jsx("p", { className: "successMessage", children: apiSuccess }), _jsx("button", { className: "btn btn-primary login-button mt-3", onClick: handleResetPassword, children: "Submit" })] })] }) }));
};
export default ChangePassword;
