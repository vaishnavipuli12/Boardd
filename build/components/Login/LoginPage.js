import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck
import { useState, useEffect } from "react";
// import Loader from '../MainWindow/Loader';
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { userLogout } from "../../utils/globalUtility";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";
// const LoginPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [errors, setErrors] = useState({ username: "", password: "" });
//     const [apiError, setApiError] = useState("");
//     const [showLoader, setShowLoader] = useState(false);
//     const [saveToken, setSaveToken] = useState("");
//     let navigate = useNavigate();
//     const dispatch = useDispatch();
//     const isLoggedIn = useSelector((state) => state.UserInfoReducer && state.UserInfoReducer.isLoggedin);
//     const loggedinError = useSelector((state) => state.UserInfoReducer && state.UserInfoReducer.loggedinError);
//     const handlePasswordToggle = () => {
//         setShowPassword(!showPassword);
//     };
//     const validateForm = () => {
//         let isValid = true;
//         let errors = { username: "", password: "" };
//         const passwordRegex = /(?=.*[0-9])/;
//         const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
//         if (!username) {
//             isValid = false;
//             errors.username = "Email address is required";
//         }
//         else if (!emailRegex.test(username)) {
//             errors.username = "Please enter a valid email address";
//         }
//         if (!password) {
//             isValid = false;
//             errors.password = "Password is required";
//         }
//         else if (password.length < 8) {
//             errors.password = "Password must be 8 characters long.";
//         }
//         else if (!passwordRegex.test(password)) {
//             errors.password = "Invalid password. Must contain one number.";
//         }
//         return { isValid, errors };
//     };
//     const findErrorById = (errorArray, field) => {
//         const filterError = errorArray.find((error) => error.field === field);
//         return filterError ? filterError.details : "";
//     };
//     const onSubmit = async (event) => {
//         event.preventDefault();
//         setApiError("");
//         setSaveToken("");
//         const { isValid, errors } = validateForm();
//         if (!isValid) {
//             setErrors({ ...errors });
//             return;
//         }
//         setErrors({ ...errors });
//         const defaultErrorMsg = "Something went wrong! Please try again.";
//         const payload = {
//             mail: username,
//             password: password,
//         };
//         setShowLoader(true);
//         // console.log("check before dispatch payload", payload);
//         // dispatch(actions.userLogin(payload));
//         // const response = await post(login, payload);
//         // if (response && response.status === 200) {
//         //   const data = response.data;
//         //   if (data && data.access_token) {
//         //     const userInfo = {
//         //       userId: data.userId,
//         //       fullName: data.name,
//         //       // userType: data.userType,
//         //       // pingInterval: data.login_reset_timeout ? data.login_reset_timeout : defaultPingInterval,
//         //       // maxFileSize: data.max_file_size ? data.max_file_size : defaultMaxFileSize,
//         //       // photoUrl: data.photo_url
//         //     };
//         //     sessionStorage.setItem("accessToken", data.access_token);
//         //     sessionStorage.setItem("refreshToken", data.refresh_token);
//         //     sessionStorage.setItem("userId", data.userId);
//         //     sessionStorage.setItem("userInfo", JSON.stringify(encrypt(userInfo)));
//         //     // if (sessionStorage.getItem('userInfo')) {
//         //     //   if (data.userType === 'admin') {
//         //     //     history.push('/adminDashboard');
//         //     //   } else {
//         //     //     history.push('/dashboard');
//         //     //   }
//         //     // }
//         //     navigate("/dashboard");
//         //   } else {
//         //     setApiError(defaultErrorMsg);
//         //   }
//         // } else {
//         //   if (
//         //     response &&
//         //     response.data &&
//         //     response.data.field_errors &&
//         //     response.data.field_errors.length > 0
//         //   ) {
//         //     const fields = response.data.field_errors;
//         //     if (
//         //       response.status === 400 &&
//         //       response.data.field_errors[1].field === "access_token"
//         //     ) {
//         //       setApiError(findErrorById(fields, "details"));
//         //       sessionStorage.setItem(
//         //         "accessToken",
//         //         response.data.field_errors[1].details
//         //       );
//         //       setSaveToken(response.data.field_errors[1].details);
//         //     } else {
//         //       setErrors({ username: findErrorById(fields, "mail"), password: "" });
//         //     }
//         //   } else if (response && response.data && response.data.details) {
//         //     setApiError(response.data.details);
//         //   } else {
//         //     setApiError(defaultErrorMsg);
//         //   }
//         // }
//         // setShowLoader(false);
//     };

    const LoginPage = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [errors, setErrors] = useState({ username: "", password: "" });
        const [apiError, setApiError] = useState("");
        const [showLoader, setShowLoader] = useState(false);
        const [saveToken, setSaveToken] = useState("");
        let navigate = useNavigate();
        const dispatch = useDispatch();
        const isLoggedIn = useSelector((state) => state.UserInfoReducer && state.UserInfoReducer.isLoggedin);
        const loggedinError = useSelector((state) => state.UserInfoReducer && state.UserInfoReducer.loggedinError);
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
            }
            else if (!emailRegex.test(username)) {
                errors.username = "Please enter a valid email address";
            }
            if (!password) {
                isValid = false;
                errors.password = "Password is required";
            }
            else if (password.length < 8) {
                errors.password = "Password must be 8 characters long.";
            }
            else if (!passwordRegex.test(password)) {
                errors.password = "Invalid password. Must contain one number.";
            }
            return { isValid, errors };
        };
        const findErrorById = (errorArray, field) => {
            const filterError = errorArray.find((error) => error.field === field);
            return filterError ? filterError.details : "";
        };
        const onSubmit = async (event) => {
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
            const payload = {
                mail: username,
                password: password,
            };
            setShowLoader(true);
        }
    /* this methods will excute when login getting success */
    useEffect(() => {
        if (sessionStorage.getItem("userInfo")) {
            navigate("/dashboard");
            setShowLoader(false);
        }
    }, [isLoggedIn]);
    console.log("check loggedIn", isLoggedIn);
    return (_jsxs("form", { id: "login", name: "login", className: "card-container card-container-login", children: [_jsxs("p", { className: "logo-label", children: ["Task Manager", _jsx("sup", { className: "login-logo-sup", children: "1" })] }), _jsxs("div", { className: "form-container", children: [_jsx("div", { className: "header-title", children: _jsx("h3", { className: "login-title", children: "LOGIN" }) }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Email" }), _jsx("input", { type: "email", placeholder: "Please Enter Email", required: true, className: "form-control", onChange: (ev) => setUsername(ev.target.value), value: username }), errors.username && _jsx("p", { className: "errorMessage", children: errors.username })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Password" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: showPassword ? "text" : "password", placeholder: "Please Enter Password", required: true, className: "form-control outline-none", onChange: (ev) => setPassword(ev.target.value), value: password }), _jsx("button", { type: "button", className: "btn btn-outline-secondary outline-none", style: { outline: "none" }, onClick: handlePasswordToggle, children: showPassword ? _jsx(BsEyeSlash, {}) : _jsx(BsEye, {}) })] }), errors.password && _jsx("p", { className: "errorMessage", children: errors.password })] }), _jsx("span", { style: { color: "red", paddingBottom: "5px" }, children: loggedinError }), _jsxs("div", { className: "nav-links", children: [_jsx("a", { className: "link-style", onClick: () => navigate("/forgotPassword"), children: "Forgot Password?" }), _jsxs("div", { children: [_jsx("span", { children: "Not have an account? " }), _jsx("a", { className: "link-style", onClick: () => navigate("/signup"), children: "Sign up" })] })] }), _jsxs("p", { className: "errorMessage", children: [apiError, saveToken && (_jsx("a", { className: "logout-style", onClick: () => userLogout(true), children: "Logout" }))] }), _jsx("button", { className: "btn btn-primary login-button", onClick: onSubmit, children: "Login" })] })] }));
};
export default LoginPage;
