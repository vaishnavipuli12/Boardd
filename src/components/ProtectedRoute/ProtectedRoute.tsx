import { Navigate, useLocation } from "react-router-dom";
import { isUser, getUserInfo } from "../Constant/ConstantFunction";

const ProtectedRoute = ({ children }: any) => {
  const token = sessionStorage.getItem('accessToken');
  const location = useLocation();
  const userInfo = getUserInfo()
  let isApplicationUser = false;
  let userType = '';
  if (userInfo) {
    isApplicationUser = userInfo.isApplicationUser;
    userType = userInfo.userType
  }

  const restrictUser = !token || (isUser() && ['/main', '/admin'].indexOf(location.pathname) > -1) || (!isApplicationUser && location.pathname === '/main') || (userType === 'LicenseAdmin' && ['/main', '/docs',].indexOf(location.pathname) > -1);

  if (restrictUser) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;