import {useTranslation} from "react-i18next";
import ModalWrapper from "@components/modal";

interface DeleteCarModalProps {
  onSubmit: () => void
  onClose: () => void
}

const DeleteCarModal = ({onSubmit, onClose}: DeleteCarModalProps) => {
  const {t} = useTranslation();
  const submitText = t("settings.cars-management.delete-item-modal.submit");

  return (
    <ModalWrapper title={t("settings.cars-management.delete-item-modal.title")} btnSubmitText={submitText} onSubmit={onSubmit} onClose={onClose}>
      <p>{t("settings.cars-management.delete-item-modal.content")}</p>
    </ModalWrapper>
  )
}

export default DeleteCarModal;