import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {useCallback} from "react";
import {doc, getDoc} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import useCurrentCar from "@hooks/useCurrentCar";
import useSelectCurrentCar from "@hooks/useSelectCurrentCar";
import Card from "@components/card";
import GoogleLogo from "@assets/google-icon.webp";

const Login = () => {
  const { firestore, auth } = getFirebase();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentCar } = useCurrentCar();
  const { setSelectedCar } = useSelectCurrentCar();

  const signInWithGoogle = useCallback(() => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(async user => {
      const currentUserRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, user.user.uid);
      const currentUserSnap = await getDoc(currentUserRef);

      if (!currentUserSnap.exists()) {
        await setSelectedCar(null);

        navigate(routes.WIZARD);
      } else {
        navigate(routes.ADD_REFUEL);
      }
    });
  }, [auth, currentCar]);

  return (
    <div className="mt-auto">
      <Card>
        <p>{t("sign-in.description")}</p>
        <div>
          <button className="text-gray-700 mt-10 flex items-center justify-center w-full" onClick={signInWithGoogle}>
            <img src={GoogleLogo} alt="google-logo" className="h-5 mr-3"/>
            {t("sign-in.google-button")}
          </button>
        </div>
      </Card>
    </div>
  )
}

export default Login;