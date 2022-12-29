import Card from "@components/card";
import FormField from "@components/form/field";
import CarIcon from "@components/icons/car";
import GraphUpIcon from "@components/icons/graphUp";
import {useTranslation} from "react-i18next";
import {AddCar} from "@models/car";
import {FormEvent} from "react";

interface AddCarFormProps {
  onSubmit: ({model, initialKm}: AddCar) => void
  submitButtonText: string
}

const AddCarForm = ({ onSubmit, submitButtonText }: AddCarFormProps) => {
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo: props submit
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <Card className="mt-10">
        <FormField icon={<CarIcon/>} className="mb-8">
          <>
            <label htmlFor="car-model">{t("wizard.form.car-model")}</label>
            <input id="car-model" type="text" name="car-model" required/>
          </>
        </FormField>
        <FormField icon={<GraphUpIcon/>}>
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