import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <>
      {auth.accessToken ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
}
