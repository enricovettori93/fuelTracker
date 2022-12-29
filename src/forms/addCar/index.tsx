import Card from "@components/card";
import FormField from "@components/form/field";
import CarIcon from "@components/icons/car";
import GraphUpIcon from "@components/icons/graphUp";
import {FormEvent} from "react";
import {useTranslation} from "react-i18next";

interface AddCarFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  submitButtonText: string
}

const AddCarForm = ({ handleSubmit, submitButtonText }: AddCarFormProps) => {
  const { t } = useTranslation();
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
        <button className="w-full h-14 bg-orange-500 rounded-3xl shadow-lg mt-16">{submitButtonText}</button>
      </Card>
    </form>
  )
}

export default AddCarForm;