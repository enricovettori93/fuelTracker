import {useTranslation} from "react-i18next";
import {FormEvent} from "react";
import AddCarForm from "@forms/addCar";
import { useNavigate } from "react-router-dom";
import {routes} from "@router";

const Wizard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo: logic implementation
    navigate(routes.ADD_CONSUMPTION);
  }

  return (
    <div className="mt-auto">
      <p>{t("wizard.description")}</p>
      <AddCarForm handleSubmit={handleSubmit} submitButtonText={t("wizard.form.submit")}/>
    </div>
  )
}

export default Wizard;