import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";

function PrivateRoute({ isLogged, shouldNavigate }) {
  let canContinue = false;
  if (isLogged || shouldNavigate) {
    canContinue = true;
  }
  const location = useLocation();
  return canContinue ? (
    <Outlet replace state={{ from: location }} />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
