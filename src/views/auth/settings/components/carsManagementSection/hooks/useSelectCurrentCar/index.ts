import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {FirebaseContext, FIRESTORE_COLLECTIONS} from "@contexts/firebase.context";

const useSelectCurrentCar = () => {
  const {t} = useTranslation();
  const {firestore, auth} = useContext(FirebaseContext);

  const setSelectedCar = async (carId: string) => {
    try {

      const currentUserCarsRef = collection(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS);

      const cars = await getDocs(currentUserCarsRef);

      for (let car of cars.docs) {
        const loopCarId = car.id;
        await setDoc(doc(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, loopCarId), {
          selected: loopCarId === carId
        }, {merge: true});
      }
    } catch (e) {
      toast.error(t("settings.cars-management.selection-ko"));
      throw new Error("Cannot select the car", {cause: e});
    }
  }

  return {
    setSelectedCar
  }
}

export default useSelectCurrentCar;