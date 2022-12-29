import React from "react";

interface FormFieldProps {
  className?: string
  children: React.ReactNode
  icon: React.ReactNode
}

const FormField = ({ icon, children, className = "" }: FormFieldProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {icon}
      <div className="ml-3 flex flex-col w-full">
        {children}
      </div>
    </div>
  )
}

export default FormField;