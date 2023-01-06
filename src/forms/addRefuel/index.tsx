import {FormEvent, useMemo} from "react";
import Card from "@components/card";
import FormField from "@components/form/field";
import CalendarIcon from "@components/icons/calendar";
import {useTranslation} from "react-i18next";
import GraphUpIcon from "@components/icons/graphUp";
import SortIcon from "@components/icons/sort";
import {AddRefuel} from "@models/refuel";
import usePosition from "@hooks/usePosition";
import ButtonSubmit from "@components/form/buttonSubmit";

interface addRefuelFormProps {
  onSubmit: ({date, actualKm, quantity}: AddRefuel) => void
  isLoading: boolean
  minMileage?: number
}

const AddRefuelForm = (props: addRefuelFormProps) => {
  const {onSubmit, isLoading, minMileage = 0} = props;
  const {t} = useTranslation();
  const {lat, lng, error} = usePosition();

  const defaultDateValue = useMemo(() => {
    return new Date().toISOString().slice(0,10);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData) as unknown as AddRefuel;
    if (lat !== null && lng !== null) {
      formValues.lng = lng;
      formValues.lat = lat;
    }
    onSubmit({ ...formValues, createdAt: new Date() });
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <Card>
        <FormField icon={<CalendarIcon/>} className="mb-8">
          <>
            <label htmlFor="date">{t("add-refuel.form.date")}</label>
            <input id="date" type="date" name="date" defaultValue={defaultDateValue} required/>
          </>
        </FormField>
        <FormField icon={<GraphUpIcon/>} className="mb-8">
          <>
            <label htmlFor="actualKm">{t("add-refuel.form.actual-km")}</label>
            <input id="actualKm" type="number" name="actualKm" max="999999" min={minMileage} required/>
          </>
        </FormField>
        <FormField icon={<SortIcon/>} className="mb-8">
          <>
            <label htmlFor="quantity">{t("add-refuel.form.quantity")}</label>
            <input id="quantity" type="number" name="quantity" max="300" min="0" required/>
          </>
        </FormField>
        {
          error && (
            <p className="text-red-400 mb-5">{t("add-refuel.no-position-grant")}</p>
          )
        }
        <div className="flex">
          <ButtonSubmit isLoading={isLoading} text={t("add-refuel.form.submit")} className="btn bg-orange-500 w-full"/>
        </div>
      </Card>
    </form>
  )
}

export default AddRefuelForm;