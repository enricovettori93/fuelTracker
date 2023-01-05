import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {doc, setDoc} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

const useSelectCurrentCar = () => {
  const {t} = useTranslation();
  const {firestore, auth} = getFirebase();

  const setSelectedCar = async (carId: string | null = null) => {
    try {
      await setDoc(doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid), {
        selectedCar: carId
      });
    } catch (e) {
      toast.error(t("settings.cars-management.selection-ko"));
      throw new Error("Cannot select the car", {cause: e})
    }
  }

  return {
    setSelectedCar
  }
}

export default useSelectCurrentCar;