import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = process.env.NODE_ENV || 'development';

const firebaseConfig = env === "production" ?
  await import("../../firebaseConfig/config.prod.json") :
  await import("../../firebaseConfig/config.develop.json");

function initialize() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
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
