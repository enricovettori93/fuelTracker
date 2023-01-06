import AddRefuelForm from "@forms/addRefuel";
import {AddRefuel} from "@models/refuel";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import useAddRefuel from "@views/auth/addRefuel/hooks/useAddRefuel";
import useCurrentCarMileage from "@hooks/useCurrentCarMileage";

const AddRefuelPage = () => {
  const navigate = useNavigate();
  const {loading, handleSubmitNewRefuel} = useAddRefuel();
  const {carMileage} = useCurrentCarMileage();

  const handleSubmit = async (data: AddRefuel) => {
    await handleSubmitNewRefuel(data);
    navigate(routes.LIST_REFUELS);
  }

  return (
    <div className="mt-auto">
      <AddRefuelForm isLoading={loading} onSubmit={handleSubmit} minMileage={carMileage} />
    </div>
  )
}

export default AddRefuelPage;