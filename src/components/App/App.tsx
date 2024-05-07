// @ts-nocheck
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import SessionExpired from "../SessionExpired/SessionExpired";
import Dashboard from "../Dashboard/Dashboard";

const LoginPage = lazy(() => import("../Login/LoginPage"));
const SignupPage = lazy(() => import("../SignupPage/SignupPage"));
const ForgotPassword = lazy(() => import("../ForgotPassword/ForgotPassword"));
const ChangePassword = lazy(() => import("../ChangePassword/ChangePassword"));
// const UserVerification = lazy(() => import('../UserVerification/UserVerification'));
// const ResetPassword = lazy(() => import('../ResetPassword/ResetPassword'));
const ProtectedRoute = lazy(() => import("../ProtectedRoute/ProtectedRoute"));
// const UserProfile = lazy(() => import('../UserProfile/UserProfile'));
// const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
// const Board = lazy(() => import("../Board/Board"));

export const store = configureStore();

function App() {
  return (
    <Suspense fallback={<div className="fallbackStyles">Loading...</div>}>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          {/* <SessionExpired /> */}
          <div id="dialog-cloud-popup"></div>
          <div id="modal-cloud-popup"></div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            {/* <Route path="/activation-link" element={<UserVerification />} />
              <Route path="/reset-password" element={<ResetPassword />} /> */}
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} /> */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
