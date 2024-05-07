import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import image005 from '../../../icons/image005.png';
import { FiLock } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { signup } from "../App/Config";
import { post } from "../../services/DataService";
// import Loader from '../MainWindow/Loader';
import { Alert } from "react-bootstrap";
import "./SignupPage.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../../store/UserInfo/actions";

const SignupPage: any = () => {
  const dispatch: any = useDispatch();
  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [msgBar, setMsgBar] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);

  let navigate = useNavigate();

  const { UserInfo, isSuccessFullRegister } = useSelector(
    (state: any) => state.UserInfoReducer && state.UserInfoReducer
  );

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async (event: any) => {
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
    let errorObj: any = {};
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
    } else if (!emailRegex.test(email)) {
      errorObj.email = "Please enter a valid email address";
    }
    if (!password) {
      errorObj.password = "Password Required";
    } else if (password.length < 8) {
      errorObj.password = "Password must be 8 characters long.";
    } else if (!passwordRegex.test(password)) {
      errorObj.password = "Invalid password. Must contain one number.";
    }
    if (!confirmPassword) {
      errorObj.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
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

  return (
    <form
      id="signup"
      name="signup"
      className="card-container card-container-signup"
    >
      {/* {showLoader && <Loader type={'simple'} />} */}
      {/* <img src={image005} className='logo-style' alt='logo' /> */}
      <p className="logo-label">
        Task Manager<sup className="login-logo-sup">1</sup>
      </p>

      <div className="form-container">
        <div className="header-title">
          <h3 className="login-title">SIGN UP</h3>
        </div>

        <div className="mb-3 form-group">
          <label className="form-label">Full Name</label>
          <div className="input-container-style">
            {/* <BiUser className='input-icon-style' /> */}
            <input
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Full Name"
              name="fName"
              className="form-control"
              type="text"
              value={fullname}
            />
          </div>
          <p className="errorMessage">{errors.fullname}</p>
        </div>

        <div className="mb-3 form-group">
          <label className="form-label">Contact</label>
          <div className="input-container-style">
            {/* <BiUser className='input-icon-style' /> */}
            <input
              onChange={(event) => setContact(event.target.value)}
              placeholder="Contact"
              name="contact"
              className="form-control"
              type="text"
              value={contact}
            />
          </div>
          <p className="errorMessage">{errors.contact}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-container-style">
            {/* <BiUser className='input-icon-style' /> */}
            <input
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              name="email"
              className="form-control"
              type="email"
              value={email}
            />
          </div>
          <p className="errorMessage">{errors.email}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            {/* <FiLock className='input-icon-style' /> */}
            <input
              type={showPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              name="password"
              className="form-control"
              value={password}
              required
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
          <p className="errorMessage">{errors.password}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmation Password</label>
          <div className="input-group">
            {/* <FiLock className='input-icon-style' /> */}
            <input
              type={showConfirmPassword ? "text" : "password"}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              name="confirmPassword"
              className="form-control"
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
          <p className="errorMessage">{errors.confirmPassword}</p>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <div className="input-container-style">
            <input
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Address"
              name="address"
              className="form-control"
              type="text"
              value={address}
              required
            />
          </div>
          <p className="errorMessage">{errors.address}</p>
        </div>

        <div>
          If you are a User:{" "}
          <a
            className="link-style"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            Login
          </a>
        </div>
        <p className="errorMessage">{apiError}</p>
        <button
          className="btn btn-primary login-button mt-3"
          onClick={handleSignup}
        >
          Signup
        </button>

        {/* <div className='trouble-text-container'>
          Having trouble?{' '}
          <a href='hello' className='link-style'>
            Contact Technical support
          </a>
        </div> */}

        {msgBar.length > 0 && (
          <Alert
            variant={msgBar[0].msgType}
            onClose={onSuccessMsgDismiss}
            dismissible
          >
            {msgBar[0].msg}
          </Alert>
        )}
      </div>
    </form>
  );
};

export default SignupPage;
