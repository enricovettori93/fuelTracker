import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {routes} from "@router";

const NotFound = () => {
  const {t} = useTranslation();
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1 className="text-3xl mb-6">{t("not-found.title")}</h1>
      <Link className="text-orange-500" to={routes.ADD_REFUEL}>{t("not-found.description")}</Link>
    </div>
  )
}

export default NotFound;