import {Car} from "@models/car";

interface CarFormRowProps {
  car: Car
  onDeleteCar: (carId: string) => void
  onSelectCar: (carId: string) => void
  isChecked: boolean
  isDeleteButtonDisabled: boolean
}

const CarFormRow = (props: CarFormRowProps) => {
  const {car, onDeleteCar, onSelectCar, isChecked, isDeleteButtonDisabled} = props;

  return (
    <div className="w-full flex justify-between items-center my-3">
      <div>
        <input
          className="mr-4"
          onChange={(e) => {e.preventDefault(); e.stopPropagation(); onSelectCar(car.id)}}
          type="radio"
          name="selected-car"
          value={car.id}
          id={car.id}
          checked={isChecked}/>
        <label htmlFor={car.id}>{car.model}</label>
      </div>
      <button
        disabled={isDeleteButtonDisabled}
        className="btn btn--danger h-10 w-10 flex justify-center items-center disabled:opacity-75"
        onClick={(e) => {e.preventDefault(); e.stopPropagation(); onDeleteCar(car.id)}}>
        <i className="ci-trash_full !text-[1rem]"/>
      </button>
    </div>
  )
}

export default CarFormRow;