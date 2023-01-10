import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {AddCar} from "@models/car";
import {addDoc, collection} from "firebase/firestore";
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";

const useAddCar = () => {
  const {t} = useTranslation();
  const {firestore, auth} = getFirebase();

  const handleSubmitNewCar = async ({model, initialKm, createdAt, selected}: AddCar) => {
    try {
      const userId = auth.currentUser!.uid;
      const userCarsRef = collection(firestore, FIRESTORE_COLLECTIONS.USERS, userId, FIRESTORE_COLLECTIONS.CARS);
      await addDoc(userCarsRef,{ model, initialKm, createdAt, selected });
    } catch (e) {
      toast.error(t("common.generic-error"));
      throw new Error("Cannot save the car", { cause: e });
    }
  }

  return {handleSubmitNewCar};
}

export default useAddCar;