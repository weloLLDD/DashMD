
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
