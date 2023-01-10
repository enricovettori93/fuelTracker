import Loader from "@components/loader";
import React, {ButtonHTMLAttributes} from "react";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  icon?: React.ReactNode
  text: string
  isLoading: boolean
  isDisabled?: boolean
}

const ButtonSubmit = ({isLoading, text, icon = null, className = "", isDisabled = false, ...restProps}: ButtonSubmitProps) => {
  return (
    <button disabled={isLoading || isDisabled} className={`${className} disabled:opacity-75 flex justify-center items-center`} type="submit" {...restProps}>
      {
        isLoading && (
          <Loader/>
        )
      }
      {
        !isLoading && icon
      }
      <span className="ml-5">{text}</span>
    </button>
  )
}

export default ButtonSubmit;