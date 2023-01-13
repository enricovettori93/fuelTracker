import React from "react";

interface LoaderProps {
  className?: string
}
const Loader = ({className = ""}: LoaderProps) => {
  return (
    <div className={`w-6 h-6 rounded-full animate-spin border border-solid border-white border-t-transparent ${className}`}></div>
  )
}

export default React.memo(Loader);