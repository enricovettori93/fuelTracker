import Navbar from "@components/navbar";
import CommonLayout, {LayoutProps} from "@layouts/commonLayout";

const AuthLayout = ({ titleKey, children }: LayoutProps) => {
  return (
    <CommonLayout titleKey={titleKey} className="overflow-y-auto pb-36">
      {children}
      <Navbar/>
    </CommonLayout>
  )
}

export default AuthLayout;