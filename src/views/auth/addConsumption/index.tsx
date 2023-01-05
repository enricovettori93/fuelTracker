import AddRefuelForm from "@forms/addRefuel";
import {AddRefuel} from "@models/refuel";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import useCurrentCar from "@hooks/useCurrentCar";
import {addDoc, collection} from "firebase/firestore";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";

const AddConsumption = () => {
  const navigate = useNavigate();
  const { firestore, auth } =  getFirebase();
  const { currentCar } = useCurrentCar();

  const handleSubmit = useCallback(async (data: AddRefuel) => {
    if (currentCar) {
      const userId = auth.currentUser!.uid;
      const userCarRef = collection(firestore, FIRESTORE_COLLECTIONS.USERS, userId, FIRESTORE_COLLECTIONS.CARS, currentCar as string, FIRESTORE_COLLECTIONS.REFUELS);
      await addDoc(userCarRef, {...data});
      navigate(routes.LIST_CONSUMPTIONS);
    }
  }, [currentCar]);

  return (
    <div className="mt-auto">
      <AddRefuelForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddConsumption;