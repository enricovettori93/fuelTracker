import {useContext, useEffect, useState} from "react";
import {Car} from "@models/car";
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import {FirebaseContext, FIRESTORE_COLLECTIONS} from "@contexts/firebase.context";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

const useListCars = () => {
  const {t} = useTranslation();
  const {firestore, auth} = useContext(FirebaseContext);
  const [cars, setCars] = useState<Car[]>([]);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteSubmit = async () => {
    if (deletingItemId) {
      try {
        await deleteDoc(doc(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, deletingItemId));
        handleDeleteClose();
        toast.success(t("settings.cars-management.delete-ok"));
      } catch (e) {
        toast.error(t("settings.cars-management.delete-ko"));
        throw new Error("Cannot delete the car", {cause: e});
      }
    }
  }

  useEffect(() => {
    const myCarCollectionRef = collection(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS);

    setLoading(true);

    const myCarSnapshot = onSnapshot(myCarCollectionRef, snapshot => {
      setCars(snapshot.docs.map(car => ({id: car.id, ...car.data()} as Car)));
      setLoading(false);
    }, error => {
      toast.error(t("settings.cars-management.fetch-ko"));
    });

    return () => {
      myCarSnapshot();
    }
  }, []);

  const handleDelete = (id: string) => {
    setDeletingItemId(id);
  }

  const handleDeleteClose = () => {
    setDeletingItemId(null);
  }

  return {
    cars,
    loading,
    deletingItemId,
    handleDeleteSubmit,
    handleDelete,
    handleDeleteClose,
  }
}

export default useListCars;