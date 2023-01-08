import Card from "@components/card";
import FormField from "@components/form/field";
import {useTranslation} from "react-i18next";
import {AddCar} from "@models/car";
import React, {FormEvent} from "react";

interface AddCarFormProps {
  onSubmit: ({model, initialKm, createdAt}: AddCar) => void
  submitButtonText: string
}

const AddCarForm = ({ onSubmit, submitButtonText }: AddCarFormProps) => {
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const model = formData.get("car-model")?.toString() ?? "";
    const initialKm = parseInt(formData.get("car-km")?.toString() ?? "0");
    onSubmit({ model, initialKm, createdAt: new Date() });
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <Card className="mt-10">
        <FormField icon={<i className="ci-link_02"/>} className="mb-8">
          <>
            <label htmlFor="car-model">{t("wizard.form.car-model")}</label>
            <input id="car-model" type="text" name="car-model" required/>
          </>
        </FormField>
        <FormField icon={<i className="ci-trending_up"/>}>
          <>
            <label htmlFor="car-km">{t("wizard.form.actual-km")}</label>
            <input id="car-km" type="number" min="0" max="999999" name="car-km" required/>
          </>
        </FormField>
        <button className="w-full btn bg-orange-500 mt-16">{submitButtonText}</button>
      </Card>
    </form>
  )
}

export default AddCarForm;