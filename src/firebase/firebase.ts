import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = process.env.NODE_ENV || 'development';

let firebaseConfig = {};

(async () => {
  firebaseConfig = env === "production" ?
    await import("../../firebaseConfig/config.prod.json") :
    await import("../../firebaseConfig/config.develop.json");
})();

function initialize() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  (async () => {
    await setPersistence(auth, browserLocalPersistence);
  })();
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
}

export const FIRESTORE_COLLECTIONS = {
  USERS: "users",
  CARS: "cars",
  REFUELS: "refuels"
}

export default function getFirebase() {
  return initialize();
}
