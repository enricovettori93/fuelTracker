import {useEffect, useState} from "react";
import {Refuel} from "@models/refuel";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import useCurrentCar from "@hooks/useCurrentCar";
import {collection, deleteDoc, doc, getDocs, limit, orderBy, query} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";

const useListRefuels = () => {
  const {t} = useTranslation();
  const {firestore, auth} = getFirebase();
  const {currentCar} = useCurrentCar();
  const QUERY_LIMIT = 100;
  const [refuels, setRefuels] = useState<Refuel[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  useEffect(() => {
    if (currentCar) {
      fetch();
    }
  }, [currentCar]);

  const fetch = async () => {
    try {
      const myRefuelsCollection = collection(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCar as string, FIRESTORE_COLLECTIONS.REFUELS);
      setLoading(true);

      const refuelQuery = query(
        myRefuelsCollection,
        orderBy('date', 'desc'),
        // todo: check if it works
        // startAt(refuels[refuels.length - 1]?.id || ""),
        limit(QUERY_LIMIT)
      );

      const results = await getDocs(refuelQuery);
      setHasMore(results.docs.length === QUERY_LIMIT);
      setRefuels(prevState => ([...prevState, ...results.docs.map(item => ({ id: item.id, ...item.data() } as Refuel))]));
    } catch (e) {
      toast.error(t("common.generic-error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (deletingItemId) {
      try {
        const detailRefuelRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCar as string, FIRESTORE_COLLECTIONS.REFUELS, deletingItemId);
        await deleteDoc(detailRefuelRef);
        handleDeleteClose();
        setRefuels(prevState => prevState.filter(item => item.id !== deletingItemId));
        toast.success(t("list-refuels.messages.delete-item-ok"));
      } catch (e) {
        toast.error(t("common.generic-error"));
      }
    }
  }

  const handleDelete = (id: string) => {
    setDeletingItemId(id);
  }

  const handleDeleteClose = () => {
    setDeletingItemId(null);
  }

  return {
    refuels,
    loading,
    hasMore,
    deletingItemId,
    handleDelete,
    handleDeleteClose,
    handleDeleteSubmit,
    fetch,
  }
}

export default useListRefuels;