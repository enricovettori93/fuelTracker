import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {useCallback} from "react";
import {setDoc, doc, getDoc} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import useCurrentCar from "@hooks/useCurrentCar";

const Login = () => {
  const { firestore, auth } = getFirebase();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentCar } = useCurrentCar();

  const signInWithGoogle = useCallback(() => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(async user => {
      const currentUserRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, user.user.uid);
      const currentUserSnap = await getDoc(currentUserRef);

      if (!currentUserSnap.exists()) {
        await setDoc(doc(firestore, FIRESTORE_COLLECTIONS.USERS, user.user.uid), {
          selectedCar: null
        });

        navigate(routes.WIZARD);
      } else {
        navigate(routes.ADD_REFUEL);
      }
    });
  }, [auth, currentCar]);

  return (
    <div>
      <button onClick={signInWithGoogle}>{t("sign-in.google-button")}</button>
    </div>
  )
}

export default Login;