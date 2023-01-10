import React, {FormEvent, useState} from "react";
import FormField from "@components/form/field";
import Card from "@components/card";
import {useTranslation} from "react-i18next";
import {subtractMonths} from "@utilities";
import ButtonSubmit from "@components/form/buttonSubmit";

interface SelectRangeDatePropsForm {
  isLoading: boolean
  isFormDisabled?: boolean
  errorMessage?: string | null
  onSelect: ({from, to}: {from: string, to: string}) => void
}

const SelectRangeDateForm = ({onSelect, isLoading = false, isFormDisabled = false, errorMessage = null}: SelectRangeDatePropsForm) => {
  const {t} = useTranslation();
  const [to, setTo] = useState(new Date().toISOString().slice(0,10));
  const [from, setFrom] = useState(subtractMonths(new Date(), 3).toISOString().slice(0,10));

  const dateErrorMessage = () => {
    const toDate = new Date(to);
    const fromDate = new Date(from);

    if (to === from) {
      return t("chart-page.form.errors.to-equal-from");
    }
    if (fromDate > toDate) {
      return t("chart-page.form.errors.from-greater-to");
    }

    return null;
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!dateErrorMessage()) {
      onSelect({to, from});
    }
  }

  return (
    <form action="#" onSubmit={handleFormSubmit}>
      <Card>
        <FormField icon={<i className="ci-calendar"/>} className="mb-8">
          <>
            <label htmlFor="from">{t("chart-page.form.from")}</label>
            <input id="from" type="date" name="from" required defaultValue={from} onChange={e => setFrom(e.target.value)}/>
          </>
        </FormField>
        <FormField icon={<i className="ci-calendar"/>}>
          <>
            <label htmlFor="to">{t("chart-page.form.to")}</label>
            <input id="to" type="date" name="to" required defaultValue={to} onChange={e => setTo(e.target.value)}/>
          </>
        </FormField>
        {
          dateErrorMessage() && (
            <p className="text-red-500 mt-5">{dateErrorMessage()}</p>
          )
        }
        {
          errorMessage && (
            <p className="text-red-500 mt-5">{errorMessage}</p>
          )
        }
        <ButtonSubmit className="w-full btn bg-orange-500 mt-5" isLoading={isLoading} isDisabled={isFormDisabled} text={t("chart-page.form.submit")}/>
      </Card>
    </form>
  )
}

export default SelectRangeDateForm;