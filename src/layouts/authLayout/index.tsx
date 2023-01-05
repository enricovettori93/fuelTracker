import Navbar from "@components/navbar";
import CommonLayout, {LayoutProps} from "@layouts/commonLayout";
import getFirebase from "@firebase/firebase";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import {useEffect} from "react";

interface AuthLayoutProps extends LayoutProps {
  withNavbar?: boolean
}

const AuthLayout = ({ titleKey, children, withNavbar = true }: AuthLayoutProps) => {
  const { auth } = getFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate(routes.LOGIN);
    }
  }, [auth.currentUser]);

  return (
    <CommonLayout titleKey={titleKey} className="overflow-y-auto pb-36">
      {children}
      {withNavbar && <Navbar/>}
    </CommonLayout>
  )
}

export default AuthLayout;