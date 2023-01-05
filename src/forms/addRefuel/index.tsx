import {FormEvent} from "react";
import Card from "@components/card";
import FormField from "@components/form/field";
import CalendarIcon from "@components/icons/calendar";
import {useTranslation} from "react-i18next";
import GraphUpIcon from "@components/icons/graphUp";
import SortIcon from "@components/icons/sort";
import {AddRefuel} from "@models/refuel";

interface addRefuelFormProps {
  onSubmit: ({date, actualKm, quantity}: AddRefuel) => void
}

const AddRefuelForm = (props: addRefuelFormProps) => {
  // todo: handle geopermission for lat & lng
  const {onSubmit} = props;
  const {t} = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData) as unknown as AddRefuel;
    onSubmit({ ...formValues });
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <Card>
        <FormField icon={<CalendarIcon/>} className="mb-8">
          <>
            <label htmlFor="date">{t("add-consumption.form.date")}</label>
            <input id="date" type="date" name="date" required/>
          </>
        </FormField>
        <FormField icon={<GraphUpIcon/>} className="mb-8">
          <>
            <label htmlFor="actualKm">{t("add-consumption.form.actual-km")}</label>
            <input id="actualKm" type="number" name="actualKm" required/>
          </>
        </FormField>
        <FormField icon={<SortIcon/>} className="mb-8">
          <>
            <label htmlFor="quantity">{t("add-consumption.form.quantity")}</label>
            <input id="quantity" type="number" name="quantity" required/>
          </>
        </FormField>
        <div className="flex">
          <button className="ml-auto btn bg-orange-500">{t("add-consumption.form.submit")}</button>
        </div>
      </Card>
    </form>
  )
}

export default AddRefuelForm;