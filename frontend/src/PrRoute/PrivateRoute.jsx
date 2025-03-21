import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("auth"); 

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
