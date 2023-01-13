import AddRefuelForm from "@forms/addRefuel";
import {AddRefuel} from "@models/refuel";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import useAddRefuel from "@views/auth/addRefuel/hooks/useAddRefuel";
import useCurrentCarMileage from "@hooks/car/useCurrentCarMileage";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {CurrentCarContext} from "@layouts/authLayout/contexts/currentCar/currentCar.context";

const AddRefuelPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {loading, handleSubmitNewRefuel} = useAddRefuel();
  const {carMileage} = useCurrentCarMileage();
  const {currentCarId} = useContext(CurrentCarContext);

  const handleSubmit = async (data: AddRefuel) => {
    await handleSubmitNewRefuel(data);
    navigate(routes.LIST_REFUELS);
  }

  return (
    <div className="mt-auto">
      <AddRefuelForm
        isLoading={loading}
        isFormDisabled={!currentCarId}
        onSubmit={handleSubmit}
        minMileage={carMileage + 1}
        errorMessage={!currentCarId ? t("common.must-insert-car-first") : null}
      />
    </div>
  )
}

export default AddRefuelPage;