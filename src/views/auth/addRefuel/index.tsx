import AddRefuelForm from "@forms/addRefuel";
import {AddRefuel} from "@models/refuel";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import useAddRefuel from "@views/auth/addRefuel/hooks/useAddRefuel";
import useCurrentCarMileage from "@hooks/car/useCurrentCarMileage";
import useCurrentCar from "@hooks/car/useCurrentCar";
import {useTranslation} from "react-i18next";

const AddRefuelPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {loading, handleSubmitNewRefuel} = useAddRefuel();
  const {carMileage} = useCurrentCarMileage();
  const {currentCar} = useCurrentCar();

  const handleSubmit = async (data: AddRefuel) => {
    await handleSubmitNewRefuel(data);
    navigate(routes.LIST_REFUELS);
  }

  return (
    <div className="mt-auto">
      <AddRefuelForm
        isLoading={loading}
        isFormDisabled={!currentCar}
        onSubmit={handleSubmit}
        minMileage={carMileage + 1}
        errorMessage={!currentCar ? t("common.must-insert-car-first") : null}
      />
    </div>
  )
}

export default AddRefuelPage;