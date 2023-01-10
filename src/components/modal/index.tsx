import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import useClickOutside from "@hooks/generics/useClickOutside";
import FullScreenOverlay from "@components/fullScreenOverlay";

interface ModalWrapperProps {
  title: string
  children: React.ReactNode
  onSubmit: () => void
  onClose: () => void
  btnSubmitText?: string
  btnCloseText?: string
  btnCloseClassName?: string
  btnSubmitClassName?: string
}

const ModalWrapper = (props: ModalWrapperProps) => {
  const {t} = useTranslation();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const {title, children, onSubmit, onClose, btnCloseClassName = "btn--orange", btnSubmitClassName = "btn--danger", btnSubmitText = t("modal.submit"), btnCloseText = t("modal.close")} = props;

  useClickOutside(modalRef,() => {
    onClose();
  });

  return (
    <FullScreenOverlay className="flex justify-center items-center">
      <div ref={modalRef} className="z-50 p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative bg-white rounded-3xl p-10">
          <div className="text-3xl font-medium">
            {title}
          </div>
          <div className="my-5 font-light text-gray-700">
            {children}
          </div>
          <div className="flex justify-evenly">
            <button type="button" onClick={onClose} className={`btn ${btnCloseClassName}`}>
              {btnCloseText}
            </button>
            <button type="button" onClick={onSubmit} className={`btn ${btnSubmitClassName}`}>
              {btnSubmitText}
            </button>
          </div>
        </div>
      </div>
    </FullScreenOverlay>
  )
}

export default ModalWrapper;