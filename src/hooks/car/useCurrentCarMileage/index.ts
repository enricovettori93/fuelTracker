import {useContext, useEffect, useState} from "react";
import {FirebaseContext, FIRESTORE_COLLECTIONS} from "@contexts/firebase.context";
import {collection, doc, getDoc, getDocs, limit, orderBy, query} from "firebase/firestore";
import {Refuel} from "@models/refuel";
import {Car} from "@models/car";
import {CurrentCarContext} from "@layouts/authLayout/contexts/currentCar/currentCar.context";

const useCurrentCarMileage = () => {
  const {firestore, auth} = useContext(FirebaseContext);
  const [carMileage, setCarMileage] = useState<number>(0);
  const {currentCarId} = useContext(CurrentCarContext);

  useEffect(() => {
    if (currentCarId) {
      const getData = async () => {
        const refuelCollectionRef = collection(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCarId, FIRESTORE_COLLECTIONS.REFUELS);
        const currentCarDocRef = doc(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCarId);

        const lastRefuelQuery = query(
          refuelCollectionRef,
          orderBy("date", "desc"),
          limit(1)
        );

        const result = await getDocs(lastRefuelQuery);

        if (result.docs.length === 1) {
          // the current car has saved at least one refuel
          setCarMileage(Number((result.docs[0].data() as Refuel).actualKm));
        } else {
          // get the initial car mileage
          const currentCar = await getDoc(currentCarDocRef);
          setCarMileage(Number((currentCar.data() as Car).initialKm));
        }
      };
      getData();
    }
  }, [currentCarId]);

  return {
    carMileage
  }
}

export default useCurrentCarMileage;