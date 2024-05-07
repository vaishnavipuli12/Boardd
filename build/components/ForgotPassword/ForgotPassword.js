import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
// import { Stack } from '@fluentui/react/lib/Stack';
import { useNavigate } from 'react-router-dom';
// import image005 from '../../../icons/image005.png';
// import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
// import { TextField } from '@fluentui/react/lib/TextField';
// import { PrimaryButton } from '@fluentui/react/lib/Button';
import { post } from '../../services/DataService';
import { getUserInfo } from '../Constant/ConstantFunction';
import { resetPassword, defaultErrorMsg } from '../App/Config';
// import Loader from '../MainWindow/Loader';
import './ForgotPassword.css';
;
const ForgotPassword = () => {
    var _a;
    let navigate = useNavigate();
    const [email, setEmail] = useState(((_a = getUserInfo()) === null || _a === void 0 ? void 0 : _a.mail) || '');
    const [errors, setErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');
    const validateForm = () => {
        let errorObj = {};
        const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!email) {
            errorObj.email = 'Email address is required';
        }
        else if (!emailRegex.test(email)) {
            errorObj.email = 'Please enter a valid email address';
        }
        return errorObj;
    };
    const findErrorById = (errorArray, field) => {
        const filterError = errorArray.find((error) => error.field === field);
        return filterError ? filterError.details : '';
    };
    const handleForgotPassword = async (event) => {
        event.preventDefault();
        setApiError('');
        setApiSuccess('');
        const errors = validateForm();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const payload = {
                email
            };
            setShowLoader(true);
            const response = await post(resetPassword, JSON.stringify(payload));
            if (response && response.status === 200) {
                setApiSuccess(response.data);
            }
            else {
                if (response && response.data && response.data.field_errors && response.data.field_errors.length > 0) {
                    const fields = response.data.field_errors;
                    setErrors({ email: findErrorById(fields, 'email') });
                }
                else if (response && response.data && response.data.details) {
                    setApiError(response.data.details);
                }
                else {
                    setApiError(defaultErrorMsg);
                }
            }
            setShowLoader(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("form", { id: 'forgot-password', name: 'forgot-password', className: 'card-container card-container-login', children: [_jsxs("p", { className: 'logo-label', children: ["Task Manager", _jsx("sup", { className: 'login-logo-sup', children: "1" })] }), _jsxs("div", { className: 'form-container', children: [_jsx("div", { className: 'header-title', children: _jsx("h3", { className: 'login-title', children: "FORGOT PASSWORD" }) }), _jsx("p", { className: 'help-text', children: "Enter your email and we'll send you a link to reset your password." }), _jsxs("div", { className: 'form-group', children: [_jsx("label", { children: "Email" }), _jsx("input", { type: 'email', placeholder: 'Please Enter Email', required: true, className: 'form-control', onChange: (ev) => setEmail(ev.target.value), value: email }), errors.username && _jsx("p", { className: 'errorMessage', children: errors.username })] }), errors.email && _jsx("p", { className: 'errorMessage', children: errors.email }), _jsx("div", { className: 'nav-links', children: _jsx("a", { className: 'link-style', onClick: () => {
                                    navigate('/login');
                                }, children: "< Back to Login" }) }), apiError && _jsx("p", { className: 'errorMessage', children: apiError }), apiSuccess && _jsx("p", { className: 'successMessage', children: apiSuccess }), _jsx("button", { className: 'btn btn-primary login-button mt-3', onClick: handleForgotPassword, children: "Submit" })] })] }) }));
};
export default ForgotPassword;
