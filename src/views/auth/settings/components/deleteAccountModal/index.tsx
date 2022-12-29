import {useTranslation} from "react-i18next";
import ModalWrapper from "@components/modal";

interface DeleteAccountModalProps {
  onSubmit: () => void
  onClose: () => void
}

const DeleteAccountModal = ({onSubmit, onClose}: DeleteAccountModalProps) => {
  const {t} = useTranslation();
  const submitText = t("settings.delete-data-modal.submit");

  return (
    <ModalWrapper title={t("settings.delete-data-modal.title")} btnSubmitText={submitText} onSubmit={onSubmit} onClose={onClose}>
      <p>{t("settings.delete-data-modal.content")}</p>
    </ModalWrapper>
  )
}

export default DeleteAccountModal;