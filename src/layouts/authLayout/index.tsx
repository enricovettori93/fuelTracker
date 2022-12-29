import Navbar from "@components/navbar";
import CommonLayout, {LayoutProps} from "@layouts/commonLayout";

const AuthLayout = ({ title, children }: LayoutProps) => {
  return (
    <CommonLayout title={title} className="overflow-y-auto pb-36">
      {children}
      <Navbar/>
    </CommonLayout>
  )
}

export default AuthLayout;