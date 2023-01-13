import Navbar from "@components/navbar";
import CommonLayout, {LayoutProps} from "@layouts/commonLayout";
import {Navigate, useLocation} from "react-router-dom";
import {routes} from "@router";
import CurrentCarProvider from "@layouts/authLayout/contexts/currentCar/currentCar.context";
import {useContext} from "react";
import {FirebaseContext} from "@contexts/firebase.context";

interface AuthLayoutProps extends LayoutProps {
  withNavbar?: boolean
}

const AuthLayout = ({ titleKey, children, withNavbar = true }: AuthLayoutProps) => {
  const { auth } = useContext(FirebaseContext);
  const location = useLocation();

  if (!auth || !auth.currentUser) {
    return (
      <Navigate to={`${routes.LOGIN}?returnUrl=${location.pathname}`} />
    )
  }

  return (
    <CurrentCarProvider>
      <CommonLayout titleKey={titleKey} className="overflow-y-auto pb-36">
        {children}
        {withNavbar && <Navbar/>}
      </CommonLayout>
    </CurrentCarProvider>
  )
}

export default AuthLayout;