import Navbar from "@components/navbar";
import CommonLayout, {LayoutProps} from "@layouts/commonLayout";
import CurrentCarProvider from "@layouts/authLayout/contexts/currentCar/currentCar.context";

interface AuthLayoutProps extends LayoutProps {
  withNavbar?: boolean
}

const AuthLayout = ({ titleKey, children, withNavbar = true }: AuthLayoutProps) => {
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