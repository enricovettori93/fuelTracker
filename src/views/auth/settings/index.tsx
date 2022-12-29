import Card from "@components/card";
import {useTranslation} from "react-i18next";
import TrashIcon from "@components/icons/trash";
import {useState} from "react";
import DeleteAccountModal from "@views/auth/settings/components/deleteAccountModal";

const Settings = () => {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState<boolean>(false);
  const {t} = useTranslation();

  const handleModalSubmit = () => {
    // todo: logic implementation
  }

  const handleModalClose = () => {
    setShowDeleteAccountModal(false)
  }

  const handleModalOpen = () => {
    setShowDeleteAccountModal(true);
  }

  return (
    <div className="mt-auto">
      <Card className="text-center">
        <p className="text-xl font-bold">{t("settings.delete-data.title")}</p>
        <p className="my-4 font-light text-gray-700">{t("settings.delete-data.description")}</p>
        <button onClick={e => {e.stopPropagation(); e.preventDefault(); handleModalOpen()}} className="btn btn--danger w-full flex items-center justify-center">
          <TrashIcon/>
          <span className="ml-3">{t("settings.delete-data.submit")}</span>
        </button>
      </Card>
      {
        showDeleteAccountModal && (
          <DeleteAccountModal onSubmit={handleModalSubmit} onClose={handleModalClose}/>
        )
      }
    </div>
  )
}

export default Settings;