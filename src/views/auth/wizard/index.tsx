import {useTranslation} from "react-i18next";
import AddCarForm from "@forms/addCar";
import { useNavigate } from "react-router-dom";
import {routes} from "@router";
import {AddCar} from "@models/car";

const Wizard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = ({model, initialKm}: AddCar) => {
    // todo: logic implementation
    navigate(routes.ADD_CONSUMPTION);
  }

  return (
    <div className="mt-auto">
      <p>{t("wizard.description")}</p>
      <AddCarForm onSubmit={handleSubmit} submitButtonText={t("wizard.form.submit")}/>
    </div>
  )
}

export default Wizard;