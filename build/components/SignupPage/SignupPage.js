import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
// import Loader from '../MainWindow/Loader';
import { Alert } from "react-bootstrap";
import "./SignupPage.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";
const SignupPage = () => {
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState("");
    const [errors, setErrors] = useState({});
    const [msgBar, setMsgBar] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    let navigate = useNavigate();
    const { UserInfo, isSuccessFullRegister } = useSelector((state) => state.UserInfoReducer && state.UserInfoReducer);
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };
    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSignup = async (event) => {
        event.preventDefault();
        setApiError("");
        const errors = validateForm();
        setErrors(errors);
        const defaultErrorMsg = "Something went wrong! Please try again.";
        if (Object.keys(errors).length === 0) {
            const payload = {
                name: fullname,
                contactNumber: contact,
                mail: email,
                password: password,
                confirmPassword: password,
                address: address,
            };
            setShowLoader(true);
            dispatch(actions.createUser(payload));
            if (isSuccessFullRegister) {
                setShowLoader(false);
            }
            // let response = await post(signup, JSON.stringify(payload));
            // setShowLoader(false);
            // if (response && response.statusText == 'OK' && response.status === 200) {
            //   setMsgBar([
            //     {
            //       msgType: 'success',
            //       msg: 'User is added successfully, Please go to Login page to proceed',
            //     },
            //   ]);
            //   resetFields();
            // } else {
            //   console.error('Error:', response);
            //   setApiError(defaultErrorMsg);
            //   setMsgBar([
            //     {
            //       msgType: 'danger',
            //       msg: 'Something went wrong, Please try again',
            //     },
            //   ]);
            // }
        }
    };
    const validateForm = () => {
        let errorObj = {};
        const passwordRegex = /(?=.*[0-9])/;
        const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!fullname) {
            errorObj.fullname = "Full name is Required";
        }
        if (!contact) {
            errorObj.contact = "Contact is required";
        }
        if (!email) {
            errorObj.email = "Email is required";
        }
        else if (!emailRegex.test(email)) {
            errorObj.email = "Please enter a valid email address";
        }
        if (!password) {
            errorObj.password = "Password Required";
        }
        else if (password.length < 8) {
            errorObj.password = "Password must be 8 characters long.";
        }
        else if (!passwordRegex.test(password)) {
            errorObj.password = "Invalid password. Must contain one number.";
        }
        if (!confirmPassword) {
            errorObj.confirmPassword = "Confirm password is required.";
        }
        else if (password !== confirmPassword) {
            errorObj.confirmPassword = "Password and confirm password to be matched.";
        }
        if (!address) {
            errorObj.address = "Address is required";
        }
        return errorObj;
    };
    const onSuccessMsgDismiss = () => {
        setMsgBar([]);
    };
    const resetFields = () => {
        setFullname("");
        setContact("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
    };
    return (_jsxs("form", { id: "signup", name: "signup", className: "card-container card-container-signup", children: [_jsxs("p", { className: "logo-label", children: ["Task Manager", _jsx("sup", { className: "login-logo-sup", children: "1" })] }), _jsxs("div", { className: "form-container", children: [_jsx("div", { className: "header-title", children: _jsx("h3", { className: "login-title", children: "SIGN UP" }) }), _jsxs("div", { className: "mb-3 form-group", children: [_jsx("label", { className: "form-label", children: "Full Name" }), _jsx("div", { className: "input-container-style", children: _jsx("input", { onChange: (event) => setFullname(event.target.value), placeholder: "Full Name", name: "fName", className: "form-control", type: "text", value: fullname }) }), _jsx("p", { className: "errorMessage", children: errors.fullname })] }), _jsxs("div", { className: "mb-3 form-group", children: [_jsx("label", { className: "form-label", children: "Contact" }), _jsx("div", { className: "input-container-style", children: _jsx("input", { onChange: (event) => setContact(event.target.value), placeholder: "Contact", name: "contact", className: "form-control", type: "text", value: contact }) }), _jsx("p", { className: "errorMessage", children: errors.contact })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Email" }), _jsx("div", { className: "input-container-style", children: _jsx("input", { onChange: (event) => setEmail(event.target.value), placeholder: "Email", name: "email", className: "form-control", type: "email", value: email }) }), _jsx("p", { className: "errorMessage", children: errors.email })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Password" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: showPassword ? "text" : "password", onChange: (event) => setPassword(event.target.value), placeholder: "Password", name: "password", className: "form-control", value: password, required: true }), _jsx("button", { type: "button", className: "btn btn-outline-secondary outline-none", style: { outline: "none" }, onClick: handlePasswordToggle, children: showPassword ? _jsx(BsEyeSlash, {}) : _jsx(BsEye, {}) })] }), _jsx("p", { className: "errorMessage", children: errors.password })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Confirmation Password" }), _jsxs("div", { className: "input-group", children: [_jsx("input", { type: showConfirmPassword ? "text" : "password", onChange: (event) => setConfirmPassword(event.target.value), placeholder: "Confirm password", name: "confirmPassword", className: "form-control", value: confirmPassword }), _jsx("button", { type: "button", className: "btn btn-outline-secondary outline-none", style: { outline: "none" }, onClick: handleConfirmPasswordToggle, children: showConfirmPassword ? _jsx(BsEyeSlash, {}) : _jsx(BsEye, {}) })] }), _jsx("p", { className: "errorMessage", children: errors.confirmPassword })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label", children: "Address" }), _jsx("div", { className: "input-container-style", children: _jsx("input", { onChange: (event) => setAddress(event.target.value), placeholder: "Address", name: "address", className: "form-control", type: "text", value: address, required: true }) }), _jsx("p", { className: "errorMessage", children: errors.address })] }), _jsxs("div", { children: ["If you are a User:", " ", _jsx("a", { className: "link-style", onClick: () => navigate("/login"), style: { cursor: "pointer" }, children: "Login" })] }), _jsx("p", { className: "errorMessage", children: apiError }), _jsx("button", { className: "btn btn-primary login-button mt-3", onClick: handleSignup, children: "Signup" }), msgBar.length > 0 && (_jsx(Alert, { variant: msgBar[0].msgType, onClose: onSuccessMsgDismiss, dismissible: true, children: msgBar[0].msg }))] })] }));
};
export default SignupPage;
