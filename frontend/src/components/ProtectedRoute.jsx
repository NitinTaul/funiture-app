import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx"; 

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;