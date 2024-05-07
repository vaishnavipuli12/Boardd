import React, { useState } from 'react';
// import { Stack } from '@fluentui/react/lib/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
// import image005 from '../../../icons/image005.png';
// import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
// import { TextField } from '@fluentui/react/lib/TextField';
// import { PrimaryButton } from '@fluentui/react/lib/Button';
import { post } from '../../services/DataService';
import { getUserInfo } from '../Constant/ConstantFunction';
import { resetPassword, defaultErrorMsg } from '../App/Config';
// import Loader from '../MainWindow/Loader';
import './ForgotPassword.css';

// const stackStyles = {
//   root: {
//     width: 400,
//     marginTop: 20,
//     background: '#ffffff',
//     boxShadow: '0 0 5px 5px #b9b6b6'
//   },
// };

// const verticalGapStackTokens = {
//   childrenGap: 10,
//   padding: 50,
// };

// const textboxStyles = {
//   fieldGroup: {
//     height: '40px',
//     minWidth: 300,
//   },
// }
interface ErrorObj {
  email?: string;
};

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState(getUserInfo()?.mail || '');
  const [errors, setErrors] = useState<any>({});
  const [showLoader, setShowLoader] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const validateForm = () => {
    let errorObj: ErrorObj = {};
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (!email) {
      errorObj.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      errorObj.email = 'Please enter a valid email address';
    }

    return errorObj;
  }

  const findErrorById = (errorArray: any, field: string) => {
    const filterError: any = errorArray.find((error: any) => error.field === field);
    return filterError ? filterError.details : '';
  };

  const handleForgotPassword = async (event: { preventDefault: () => void; }) => {
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
      } else {
        if (response && response.data && response.data.field_errors && response.data.field_errors.length > 0) {
          const fields = response.data.field_errors;
          setErrors({ email: findErrorById(fields, 'email') });
        } else if (response && response.data && response.data.details) {
          setApiError(response.data.details);
        } else {
          setApiError(defaultErrorMsg);
        }
      }
      setShowLoader(false);
    }
  };

  return (
    <>
      <form id='forgot-password' name='forgot-password' className='card-container card-container-login'>
        {/* {showLoader && <Loader type={'simple'} />} */}
        {/* <img src={image005} className='logo-style' alt='logo' /> */}
        <p className='logo-label'>
          Task Manager<sup className='login-logo-sup'>1</sup>
        </p>

        <div className='form-container'>
          <div className='header-title'>
            <h3 className='login-title'>FORGOT PASSWORD</h3>
          </div>
          <p className='help-text'>Enter your email and we'll send you a link to reset your password.</p>
          <div className='form-group'>
            <label>Email</label>
            <input
                type='email'
                placeholder='Please Enter Email'
                required
                className='form-control'
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
            />
            {errors.username && <p className='errorMessage'>{errors.username}</p>}
          </div>
          {errors.email && <p className='errorMessage'>{errors.email}</p>}
          <div className='nav-links'>
            <a
              className='link-style'
              onClick={() => {
                navigate('/login');
              }}
            >
              &lt; Back to Login
            </a>
          </div>
          {apiError && <p className='errorMessage'>{apiError}</p>}
          {apiSuccess && <p className='successMessage'>{apiSuccess}</p>}
          {/* <PrimaryButton className='forgot-button' text='Submit' onClick={handleForgotPassword} allowDisabledFocus
          /> */}
          <button className='btn btn-primary login-button mt-3' onClick={handleForgotPassword}>
            Submit
          </button>
        </div>

      </form >
    </>
  )
}

export default ForgotPassword;