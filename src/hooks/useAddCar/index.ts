import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {AddCar} from "@models/car";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";

const useAddCar = () => {
  const {t} = useTranslation();
  const {firestore, auth} = getFirebase();

  const handleSubmitNewCar = async ({model, initialKm}: AddCar, setAsDefault: boolean = false) => {
    try {
      const userId = auth.currentUser!.uid;
      const userCarsRef = collection(firestore, FIRESTORE_COLLECTIONS.USERS, userId, FIRESTORE_COLLECTIONS.CARS);
      const addedCar = await addDoc(userCarsRef,{ model, initialKm });
      if (setAsDefault) {
        const userDocRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, userId);
        await setDoc(userDocRef, { selectedCar: addedCar.id }, { merge: true });
      }
    } catch (e) {
      toast.error(t("common.generic-error"));
      throw new Error("Cannot save the car", { cause: e });
    }
  }

  return {handleSubmitNewCar};
}

export default useAddCar;