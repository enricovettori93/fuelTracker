import { Firestore } from "@firebase/firestore/dist";
import { Auth } from "@firebase/auth/dist"
import React, {useCallback, useEffect, useState} from "react";
import {FirebaseApp} from "@firebase/app/dist/app";
import {initializeApp} from "firebase/app";
import {browserLocalPersistence, getAuth, setPersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const env = process.env.NODE_ENV || 'development';

export const FIRESTORE_COLLECTIONS = {
  USERS: "users",
  CARS: "cars",
  REFUELS: "refuels"
}

interface IFirebaseContext {
  auth: Auth | null
  firestore: Firestore | null
  bootstrapped: boolean
  firebaseApp: FirebaseApp | null
}

export const FirebaseContext = React.createContext<IFirebaseContext>({
  auth: null,
  firestore: null,
  bootstrapped: false,
  firebaseApp: null
});

const FirebaseProvider = (props: React.PropsWithChildren<any>) => {
  const {children} = props;
  const [firebaseConfig, setFirebaseConfig] = useState<object | null>(null);
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [bootstrapped, setBootstrapped] = useState<boolean>(false);

  const fetchImport = useCallback(async () => {
    const config = env === "production" ?
      await import("../../firebaseConfig/config.prod.json") :
      await import("../../firebaseConfig/config.develop.json");

    setFirebaseConfig(config);
  }, []);

  useEffect(() => {
    fetchImport();
  }, []);

  useEffect(() => {
    if (firebaseConfig) {
      const initialize = async () => {
        const firebaseApp = initializeApp(firebaseConfig);
        const auth = getAuth(firebaseApp);
        await setPersistence(auth, browserLocalPersistence);
        const firestore = getFirestore(firebaseApp);
        setFirebaseApp(firebaseApp);
        setAuth(auth);
        setFirestore(firestore);
        setBootstrapped(true);
      };

      initialize();
    }
  }, [firebaseConfig]);

  return (
    <FirebaseContext.Provider value={{auth, firestore, bootstrapped, firebaseApp}}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider;