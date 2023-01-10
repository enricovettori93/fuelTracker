import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {useCallback, useEffect} from "react";
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {useTranslation} from "react-i18next";
import {useNavigate, useSearchParams} from "react-router-dom";
import {routes} from "@router";
import useCurrentCar from "@hooks/car/useCurrentCar";
import Card from "@components/card";
import GoogleLogo from "@assets/google-icon.webp";

const Login = () => {
  const { firestore, auth } = getFirebase();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentCar } = useCurrentCar();
  const [urlSearchParams] = useSearchParams();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      await handleUserFlow();
    })
  }, [auth]);

  const signInWithGoogle = useCallback(async () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(async (user) => {
      await handleUserFlow();
    });
  }, [auth, currentCar]);

  const handleUserFlow = async () => {
    const currentUserRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid);
    const currentUserSnap = await getDoc(currentUserRef);
    let nextRoute = "";

    if (!currentUserSnap.exists()) {
      await setDoc(doc(firestore, FIRESTORE_COLLECTIONS.USERS, auth.currentUser!.uid), {});
      nextRoute = routes.WIZARD;
    } else {
      nextRoute = urlSearchParams.get('returnUrl') ?? routes.ADD_REFUEL;
    }

    navigate(nextRoute);
  }

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