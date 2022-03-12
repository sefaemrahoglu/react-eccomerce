import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function PrivateRoute({ component: Component, admin, ...rest }) {
  const { loggedIn, user } = useAuth();
  if (loggedIn || (admin && user?.role === "admin")) {
    return <Component {...rest} />;
  }
  return <Navigate to="/" />;
}
export default PrivateRoute;
