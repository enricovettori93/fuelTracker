import React from "react";
import {useTranslation} from "react-i18next";

export interface LayoutProps {
  children: React.ReactNode
  titleKey?: string,
  className?: string
}

const CommonLayout = ({ titleKey, children, className = "" }: LayoutProps) => {
  const {t} = useTranslation();
  return (
    <div className={`p-5 flex flex-col w-full h-full ${className}`}>
      {
        titleKey && (
          <h1 className="text-4xl py-7">{t(titleKey)}</h1>
        )
      }
      {children}
    </div>
  )
}

export default CommonLayout;