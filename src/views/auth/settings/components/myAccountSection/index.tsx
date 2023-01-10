import {useTranslation} from "react-i18next";
import Card from "@components/card";
import getFirebase from "@firebase/firebase";
import useLogout from "@hooks/user/useLogout";

const MyAccountSection = () => {
  const {t} = useTranslation();
  const {auth} = getFirebase();
  const {logout} = useLogout();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <Card className="my-4 text-center">
      <p className="text-xl font-bold">{t("settings.my-account.title", { fullName: `${auth.currentUser?.displayName}` })}</p>
      <p className="my-4 font-light text-gray-700">{t("settings.my-account.description")}</p>
      <button onClick={handleLogout} className="btn btn--orange w-full flex items-center justify-center">
        <i className="ci-exit"/>
        <span className="ml-3">{t("settings.my-account.logout")}</span>
      </button>
    </Card>
  )
}

export default MyAccountSection;