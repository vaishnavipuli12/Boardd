import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import { isUser, getUserInfo } from "../Constant/ConstantFunction";
const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('accessToken');
    const location = useLocation();
    const userInfo = getUserInfo();
    let isApplicationUser = false;
    let userType = '';
    if (userInfo) {
        isApplicationUser = userInfo.isApplicationUser;
        userType = userInfo.userType;
    }
    const restrictUser = !token || (isUser() && ['/main', '/admin'].indexOf(location.pathname) > -1) || (!isApplicationUser && location.pathname === '/main') || (userType === 'LicenseAdmin' && ['/main', '/docs',].indexOf(location.pathname) > -1);
    if (restrictUser) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { path: location.pathname } });
    }
    return children;
};
export default ProtectedRoute;
