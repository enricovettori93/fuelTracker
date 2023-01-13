import {useContext, useEffect, useState} from "react";
import {FirebaseContext, FIRESTORE_COLLECTIONS} from "@contexts/firebase.context";
import {collection, onSnapshot} from "firebase/firestore";
import {Car} from "@models/car";

const useCurrentCar = () => {
  const {firestore, auth} = useContext(FirebaseContext);
  const [currentCar, setCurrentCar] = useState<string | null>(null);

  useEffect(() => {
    if (firestore && auth && auth.currentUser) {
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
  }, [auth, firestore]);

  return { currentCar };
}

export default useCurrentCar;