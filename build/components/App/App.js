import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
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
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "fallbackStyles", children: "Loading..." }), children: _jsx(Provider, { store: store, children: _jsxs(BrowserRouter, { children: [_jsx(ToastContainer, {}), _jsx("div", { id: "dialog-cloud-popup" }), _jsx("div", { id: "modal-cloud-popup" }), _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignupPage, {}) }), _jsx(Route, { path: "/forgotPassword", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/change-password", element: _jsx(ChangePassword, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(LoginPage, {}) })] })] }) }) }));
}
export default App;
