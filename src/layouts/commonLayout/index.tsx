import React from "react";

export interface LayoutProps {
  title: string,
  children: React.ReactNode
  className?: string
}

const CommonLayout = ({ title, children, className = "" }: LayoutProps) => {
  return (
    <div className={`p-5 flex flex-col w-full h-full ${className}`}>
      <h1 className="text-4xl py-7">{title}</h1>
      {children}
    </div>
  )
}

export default CommonLayout;