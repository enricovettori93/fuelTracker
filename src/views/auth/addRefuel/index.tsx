import AddRefuelForm from "@forms/addRefuel";
import {AddRefuel} from "@models/refuel";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import useAddRefuel from "@views/auth/addRefuel/hooks/useAddRefuel";

const AddRefuelPage = () => {
  const navigate = useNavigate();
  const {handleSubmitNewRefuel} = useAddRefuel();

  const handleSubmit = async (data: AddRefuel) => {
    await handleSubmitNewRefuel(data);
    navigate(routes.LIST_REFUELS);
  }

  return (
    <div className="mt-auto">
      <AddRefuelForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddRefuelPage;