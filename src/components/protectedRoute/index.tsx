import React, {useContext} from "react";
import {FirebaseContext} from "@contexts/firebase.context";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {routes} from "@router";

const ProtectedRoute = () => {
  const { auth } = useContext(FirebaseContext);
  const location = useLocation();

  if (!auth || !auth.currentUser) {
    return (
      <Navigate to={`${routes.LOGIN}?returnUrl=${location.pathname}`} />
    )
  }

  return (
    <Outlet/>
  )
}

export default ProtectedRoute;