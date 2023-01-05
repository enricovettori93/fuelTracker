import {useTranslation} from "react-i18next";
import ModalWrapper from "@components/modal";

interface DeleteItemModalProps {
  onSubmit: () => void
  onClose: () => void
}

const DeleteItemModal = ({onSubmit, onClose}: DeleteItemModalProps) => {
  const {t} = useTranslation();
  const submitText = t("list-refuels.delete-item-modal.submit");

  return (
    <ModalWrapper title={t("list-refuels.delete-item-modal.title")} btnSubmitText={submitText} onSubmit={onSubmit} onClose={onClose}>
      <p>{t("list-refuels.delete-item-modal.content")}</p>
    </ModalWrapper>
  )
}

export default DeleteItemModal;