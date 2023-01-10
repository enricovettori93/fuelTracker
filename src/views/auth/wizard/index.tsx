import {useTranslation} from "react-i18next";
import AddCarForm from "@forms/addCar";
import { useNavigate } from "react-router-dom";
import {routes} from "@router";
import {AddCar} from "@models/car";
import useAddCar from "@hooks/car/useAddCar";

const WizardPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {handleSubmitNewCar} = useAddCar();

  const handleSubmit = async ({model, initialKm, createdAt}: AddCar) => {
    await handleSubmitNewCar({model, initialKm, createdAt, selected: true});
    navigate(routes.ADD_REFUEL);
  }

  return (
    <div className="mt-auto">
      <p>{t("wizard.description")}</p>
      <AddCarForm onSubmit={handleSubmit} submitButtonText={t("wizard.form.submit")}/>
    </div>
  )
}

export default WizardPage;