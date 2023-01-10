import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import useCurrentCar from "@hooks/car/useCurrentCar";
import {AddRefuel} from "@models/refuel";
import {addDoc, collection} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const useAddRefuel = () => {
  const { t } =  useTranslation();
  const { firestore, auth } =  getFirebase();
  const { currentCar } = useCurrentCar();
  const [ loading, setLoading ] = useState<boolean>(false);

  const handleSubmitNewRefuel = async (data: AddRefuel) => {
    try {
      if (currentCar) {
        setLoading(true);
        const userId = auth.currentUser!.uid;
        const userCarRef = collection(firestore, FIRESTORE_COLLECTIONS.USERS, userId, FIRESTORE_COLLECTIONS.CARS, currentCar as string, FIRESTORE_COLLECTIONS.REFUELS);
        await addDoc(userCarRef, {...data});
      }
    } catch (e) {
      toast.error(t("common.generic-error"));
    } finally {
      setLoading(true);
    }
  }

  return {
    loading,
    handleSubmitNewRefuel
  };
}

export default useAddRefuel;