import {useEffect, useState} from "react";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {doc, getDoc} from "firebase/firestore";
import {AdditionalUserInfo} from "@models/user";

const useCurrentCar = () => {
  const {firestore, auth} = getFirebase();
  const [currentCar, setCurrentCar] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      const getData = async () => {
        const currentUserRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid);
        const currentUserDoc = await getDoc(currentUserRef);
        setCurrentCar((currentUserDoc.data() as AdditionalUserInfo).selectedCar)
      }

      getData();
    }
  }, [auth.currentUser, firestore]);

  return { currentCar };
}

export default useCurrentCar;