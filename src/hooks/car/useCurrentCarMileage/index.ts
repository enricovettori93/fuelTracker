import {useEffect, useState} from "react";
import useCurrentCar from "@hooks/car/useCurrentCar";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {collection, doc, getDoc, getDocs, limit, orderBy, query} from "firebase/firestore";
import {Refuel} from "@models/refuel";
import {Car} from "@models/car";

const useCurrentCarMileage = () => {
  const {firestore, auth} = getFirebase();
  const [carMileage, setCarMileage] = useState<number>(0);
  const {currentCar} = useCurrentCar();

  useEffect(() => {
    if (currentCar) {
      const getData = async () => {
        const refuelCollectionRef = collection(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCar, FIRESTORE_COLLECTIONS.REFUELS);
        const currentCarDocRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS, currentCar);

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
  }, [currentCar]);

  return {
    carMileage
  }
}

export default useCurrentCarMileage;