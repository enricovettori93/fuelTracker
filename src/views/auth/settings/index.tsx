import DeleteAccountSection from "@views/auth/settings/components/deleteAccountSection";
import MyAccountSection from "@views/auth/settings/components/myAccountSection";
import CarsManagementSection from "@views/auth/settings/components/carsManagementSection";

const SettingsPage = () => {
  return (
    <div className="mt-auto">
      <MyAccountSection/>
      <DeleteAccountSection/>
      <CarsManagementSection/>
    </div>
  )
}

export default SettingsPage;