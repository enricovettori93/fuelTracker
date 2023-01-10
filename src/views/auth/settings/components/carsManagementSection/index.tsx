import Card from "@components/card";
import useListCars from "@views/auth/settings/components/carsManagementSection/hooks/useListCars";
import {useTranslation} from "react-i18next";
import useCurrentCar from "@hooks/car/useCurrentCar";
import CarFormRow from "@views/auth/settings/components/carsManagementSection/components/carFormRow";
import useSelectCurrentCar from "@views/auth/settings/components/carsManagementSection/hooks/useSelectCurrentCar";
import DeleteCarModal from "@views/auth/settings/components/carsManagementSection/components/deleteItemModal";
import {Link} from "react-router-dom";
import {routes} from "@router";

const CarsManagementSection = () => {
  const {t} = useTranslation();
  const {
    cars,
    loading,
    deletingItemId,
    handleDeleteSubmit,
    handleDeleteClose,
    handleDelete,
  } = useListCars();
  const {currentCar} = useCurrentCar();
  const {setSelectedCar} = useSelectCurrentCar();

  const handleChangeSelectedCar = async (carId: string) => {
    await setSelectedCar(carId);
  }

  return (
    <Card className="my-4 text-center">
      <p className="text-xl font-bold mb-4">{t("settings.cars-management.title")}</p>
      {
        loading && (
          <p>{t("common.loading")}</p>
        )
      }
      {
        !loading && cars.length === 0 && (
          <p>{t("settings.cars-management.no-car")}</p>
        )
      }
      {
        !loading && cars.length > 0 && (
          <form action="#">
            {
              cars.map(car => <CarFormRow key={car.id} car={car} onDeleteCar={handleDelete} onSelectCar={handleChangeSelectedCar} isChecked={car.id === currentCar} isDeleteButtonDisabled={car.id === currentCar} />)
            }
          </form>
        )
      }
      {
        deletingItemId && (
          <DeleteCarModal onClose={handleDeleteClose} onSubmit={handleDeleteSubmit}/>
        )
      }
      <div className="mt-4">
        <button className="btn btn--orange w-full flex items-center justify-center">
          <i className="ci-plus_circle_outline mr-3"/>
          <Link to={routes.WIZARD}>{t("settings.cars-management.add-car-button")}</Link>
        </button>
      </div>
    </Card>
  )
}

export default CarsManagementSection;