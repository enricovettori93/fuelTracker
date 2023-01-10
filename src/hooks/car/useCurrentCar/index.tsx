import {useEffect, useState} from "react";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {collection, onSnapshot} from "firebase/firestore";
import {Car} from "@models/car";

const useCurrentCar = () => {
  const {firestore, auth} = getFirebase();
  const [currentCar, setCurrentCar] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      const currentUserCarsRef = collection(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid, FIRESTORE_COLLECTIONS.CARS);

      const userCarsSnapshot = onSnapshot(currentUserCarsRef, snapshot => {
        const currentCar = snapshot.docs.find(item => (item.data() as Car).selected);
        if (currentCar) {
          setCurrentCar(currentCar.id);
        }
      });
      
      return () => {
        userCarsSnapshot();
      }
    }
  }, [auth.currentUser, firestore]);

  return { currentCar };
}

export default useCurrentCar;