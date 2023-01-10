import {useContext, useEffect, useState} from "react";
import {Refuel} from "@models/refuel";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {collection, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {CurrentCarContext} from "@layouts/authLayout/contexts/currentCar/CurrentCarContextProvider";

const useListRefuels = () => {
  const {t} = useTranslation();
  const {firestore, auth} = getFirebase();
  const {currentCarId} = useContext(CurrentCarContext);
  const QUERY_LIMIT = 50;
  const [refuels, setRefuels] = useState<Refuel[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  useEffect(() => {
    if (currentCarId) {
      fetch();
    }
  }, [currentCarId]);

  const fetch = async () => {
    try {
      const myRefuelsCollection = collection(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCarId as string, FIRESTORE_COLLECTIONS.REFUELS);
      setLoading(true);
      let refuelQuery;

      if (refuels.length === 0) {
        refuelQuery = query(
          myRefuelsCollection,
          orderBy('createdAt', 'desc'),
          limit(QUERY_LIMIT)
        );
      } else {
        refuelQuery = query(
          myRefuelsCollection,
          orderBy('createdAt', 'desc'),
          startAfter(refuels[refuels.length - 1]?.createdAt),
          limit(QUERY_LIMIT)
        );
      }

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
        const detailRefuelRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCarId as string, FIRESTORE_COLLECTIONS.REFUELS, deletingItemId);
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