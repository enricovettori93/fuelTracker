import {useEffect, useState} from "react";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {doc, onSnapshot} from "firebase/firestore";
import {AdditionalUserInfo} from "@models/user";

const useCurrentCar = () => {
  const {firestore, auth} = getFirebase();
  const [currentCar, setCurrentCar] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      const currentUserDoc = doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid);

      const currentCarSnapshot = onSnapshot(currentUserDoc, snapshot => {
        setCurrentCar((snapshot.data() as AdditionalUserInfo).selectedCar)
      });
      
      return () => {
        currentCarSnapshot();
      }
    }
  }, [auth.currentUser, firestore]);

  return { currentCar };
}

export default useCurrentCar;