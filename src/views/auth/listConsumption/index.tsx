import {Refuel} from "@models/refuel";
import ListItem from "@views/auth/listConsumption/components/listItem";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {collection, query, limit, orderBy, deleteDoc, doc, getDocs} from 'firebase/firestore';
import DeleteItemModal from "@views/auth/listConsumption/components/deleteItemModal";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import useCurrentCar from "@hooks/useCurrentCar";

const ListConsumption = () => {
  const QUERY_LIMIT = 100;
  const [refuels, setRefuels] = useState<Refuel[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const {t} = useTranslation();
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const {firestore, auth} = getFirebase();
  const {currentCar} = useCurrentCar();

  const fetch = async () => {
    const myRefuelsCollection = collection(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCar as string, FIRESTORE_COLLECTIONS.REFUELS);
    console.log('fetch list')

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
  };

  useEffect(() => {
    if (currentCar) {
      fetch();
    }
  }, [currentCar]);

  const handleDelete = (id: string) => {
    setDeletingItemId(id);
  }

  const handleDeleteClose = () => {
    setDeletingItemId(null);
  }

  const handleDeleteSubmit = async () => {
    if (deletingItemId) {
      const detailRefuelRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCar as string, FIRESTORE_COLLECTIONS.REFUELS, deletingItemId);
      await deleteDoc(detailRefuelRef);
      setRefuels(prevState => prevState.filter(item => item.id !== deletingItemId));
      handleDeleteClose();
    }
  }

  return (
    <section>
      {
        refuels.length === 0 && (
          <span>{t("list-consumption.no-data-available")}</span>
        )
      }
      {
        refuels.length > 0 && (
          <>
            <ul>
              {
                refuels.map(item => <ListItem key={item.id} className={"my-3"} refuel={item} onDelete={handleDelete} />)
              }
            </ul>
            {
              hasMore && (
                <div className="flex justify-center">
                  <button>{t("list-consumption.load-more")}</button>
                </div>
              )
            }
          </>
        )
      }
      {
        deletingItemId && (
          <DeleteItemModal onClose={handleDeleteClose} onSubmit={handleDeleteSubmit}/>
        )
      }
    </section>
  )
}

export default ListConsumption;