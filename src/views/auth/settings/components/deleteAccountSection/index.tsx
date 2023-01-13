import {useState} from "react";
import {useTranslation} from "react-i18next";
import Card from "@components/card";
import DeleteAccountModal from "@views/auth/settings/components/deleteAccountSection/components/deleteAccountModal";
import useDeleteUserData from "@views/auth/settings/components/deleteAccountSection/hooks/useDeleteUserData";
import useLogout from "@hooks/user/useLogout";

const DeleteAccountSection = () => {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState<boolean>(false);
  const {t} = useTranslation();
  const {deleteUserData} = useDeleteUserData();
  const {logout} = useLogout();

  const handleModalSubmit = async () => {
    await deleteUserData();
    await logout();
  }

  const handleModalClose = () => {
    setShowDeleteAccountModal(false)
  }

  const handleModalOpen = () => {
    setShowDeleteAccountModal(true);
  }

  return (
    <>
      <Card className="text-center my-4">
        <p className="text-xl font-bold">{t("settings.delete-data.title")}</p>
        <p className="my-4 font-light text-gray-700">{t("settings.delete-data.description")}</p>
        <button disabled onClick={e => {e.stopPropagation(); e.preventDefault(); handleModalOpen()}} className="btn btn--danger w-full flex items-center justify-center disabled:opacity-75">
          <i className="ci-warning_outline"/>
          <span className="ml-3">{t("settings.delete-data.submit")}</span>
        </button>
      </Card>
      {
        showDeleteAccountModal && (
          <DeleteAccountModal onSubmit={handleModalSubmit} onClose={handleModalClose}/>
        )
      }
    </>
  )
}

export default DeleteAccountSection;