import {FirebaseContext, FIRESTORE_COLLECTIONS} from "@contexts/firebase.context";
import {deleteDoc, doc} from "firebase/firestore";
import {toast} from "react-hot-toast";
import {useTranslation} from "react-i18next";
import {useContext} from "react";

const useDeleteUserData = () => {
  const {firestore, auth} = useContext(FirebaseContext);
  const {t} = useTranslation();

  const deleteUserData = async () => {
    try {
      const userDocRef = doc(firestore!, FIRESTORE_COLLECTIONS.USERS, auth!.currentUser!.uid);
      await deleteDoc(userDocRef);
    } catch (e) {
      toast.error(t("common.generic-error"));
      throw new Error("Cannot save the car", { cause: e });
    }
  }

  return {
    deleteUserData
  }
}

export default useDeleteUserData;