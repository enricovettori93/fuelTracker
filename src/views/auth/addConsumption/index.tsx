import AddRefuelForm from "@forms/addRefuel";
import {AddRefuel} from "@models/refuel";

const AddConsumption = () => {
  const handleSubmit = ({date, actualKm, quantity}: AddRefuel) => {
    // todo: logic implementation
  }

  return (
    <div className="mt-auto">
      <AddRefuelForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddConsumption;