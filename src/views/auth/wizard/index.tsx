import {useTranslation} from "react-i18next";
import AddCarForm from "@forms/addCar";
import { useNavigate } from "react-router-dom";
import {routes} from "@router";
import {AddCar} from "@models/car";
import getFirebase, {FIRESTORE_COLLECTIONS} from "@firebase/firebase";
import {addDoc, collection, setDoc, doc} from "firebase/firestore";

const Wizard = () => {
  const { firestore, auth } = getFirebase();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async ({model, initialKm}: AddCar) => {
    const userId = auth.currentUser!.uid;
    const userCarsRef = collection(firestore, FIRESTORE_COLLECTIONS.USERS, userId, FIRESTORE_COLLECTIONS.CARS);
    const addedCar = await addDoc(userCarsRef,{ model, initialKm });
    const userDocRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, userId);
    await setDoc(userDocRef, { selectedCar: addedCar.id }, { merge: true });
    navigate(routes.ADD_CONSUMPTION);
  }

  return (
    <div className="mt-auto">
      <p>{t("wizard.description")}</p>
      <AddCarForm onSubmit={handleSubmit} submitButtonText={t("wizard.form.submit")}/>
    </div>
  )
}

export default Wizard;