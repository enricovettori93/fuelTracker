import {useContext, useState} from "react";
import {Refuel} from "@models/refuel";
import {collection, query, orderBy, startAt, endAt, getDocs} from "firebase/firestore";
import {FirebaseContext, FIRESTORE_COLLECTIONS} from "@contexts/firebase.context";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {CurrentCarContext} from "@layouts/authLayout/contexts/currentCar/currentCar.context";

const useSearchRefuel = () => {
  const {t} = useTranslation();
  const {firestore, auth} = useContext(FirebaseContext);
  const {currentCarId} = useContext(CurrentCarContext);
  const [refuels, setRefuels] = useState<Refuel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async ({from, to}: {
    from: string
    to: string
  }) => {
    try {
      setLoading(true);
      const refuelsCollectionRef = collection(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCarId as string, FIRESTORE_COLLECTIONS.REFUELS);

      const refuelQuery = query(
        refuelsCollectionRef,
        orderBy("date"),
        startAt(from),
        endAt(to)
      );

      const results = await getDocs(refuelQuery);
      setRefuels(results.docs.map(refuel => ({id: refuel.id, ...refuel.data()} as Refuel)));
    } catch (e) {
      toast.error(t("common.generic-error"));
      throw new Error("Cannot fetch the refuels", {cause: e});
    } finally {
      setLoading(false);
    }
  }

  return {
    refuels,
    loading,
    getData
  }
}

export default useSearchRefuel;