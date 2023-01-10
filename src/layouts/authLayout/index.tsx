import Navbar from "@components/navbar";
import CommonLayout, {LayoutProps} from "@layouts/commonLayout";
import getFirebase from "@firebase/firebase";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "@router";
import {useEffect} from "react";
import CurrentCarContextProvider from "@layouts/authLayout/contexts/currentCar/CurrentCarContextProvider";

interface AuthLayoutProps extends LayoutProps {
  withNavbar?: boolean
}

const AuthLayout = ({ titleKey, children, withNavbar = true }: AuthLayoutProps) => {
  const { auth } = getFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate({ pathname: routes.LOGIN, search: `?returnUrl=${location.pathname}` });
    }
  }, [auth.currentUser]);

  return (
    <CurrentCarContextProvider>
      <CommonLayout titleKey={titleKey} className="overflow-y-auto pb-36">
        {children}
        {withNavbar && <Navbar/>}
      </CommonLayout>
    </CurrentCarContextProvider>
  )
}

export default AuthLayout;