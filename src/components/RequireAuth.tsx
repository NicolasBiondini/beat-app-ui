import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type Props = {};

function RequireAuth({}: Props) {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.itsAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
}

export default RequireAuth;
